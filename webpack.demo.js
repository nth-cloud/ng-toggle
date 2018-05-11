let path = require('path');
let webpack = require('webpack');

// Webpack Plugins
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let ngToolsWebpack = require('@ngtools/webpack');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
let ENV = process.env.MODE;
let isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    let config = {};

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    config.entry = {
        'polyfills': './demo/src/polyfills.ts',
        'vendorStyles': [
            './node_modules/prismjs/themes/prism.css',
            './node_modules/bootstrap/dist/css/bootstrap.css'
        ],
        'main': './demo/src/main.ts'
    };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = {
        path: root('demo', 'dist'),
        publicPath: '/',
        filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
        chunkFilename: isProd ? 'js/[id].[hash].chunk.js' : 'js/[id].chunk.js'
    };

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        modules: [root('demo'), 'node_modules'],
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.css', '.scss', '.html'],

        alias: {
            'ngx-toggle': root('src/index.ts')
        }
    };

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        rules: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                use: /*isProd ? '@ngtools/webpack' : */'ts-loader'
            },

            {
                test: /\.ts$/,
                use: 'angular2-template-loader'
            },

            // copy those assets to output
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader?name=fonts/[name].[hash].[ext]'
            },

            // Support for CSS as raw text
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.css$/,
                exclude: root('demo', 'src', 'app'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?sourceMap-loader',
                    'postcss-loader',
                ]
            },
            // all css required in src/app files will be merged in js files
            {
                test: /\.css$/, include: root('demo', 'src', 'app'),
                use: [
                    'raw-loader',
                    'postcss-loader',
                ]
            },

            // support for .scss files
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.scss$/,
                exclude: root('src', 'app'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?sourceMap-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            // all css required in src/app files will be merged in js files
            {
                test: /\.scss$/,
                exclude: root('demo', 'src', 'style'),
                use: [
                    'raw-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },

            // support for .html as raw text
            {
                test: /\.html$/,
                use: 'raw-loader'
            },

            {
                test: /\.md$/,
                use: [
                    'html-loader',
                    'markdown-loader'
                ]
            }
        ],
        noParse: [/.+zone\.js\/dist\/.+/]
    };

    config.optimization = {
        splitChunks: {
            name: true,
            cacheGroups: {
                main: {},
                polyfills: {},
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all"
                }
            }
        }
    };

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        // Define env variables to help with builds
        // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV),
                version: JSON.stringify(require('./package.json').version)
            }
        }),

        // Inject script and link tags into html files
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: './demo/src/public/index.html',
            chunksSortMode: 'dependency'
        }),

        new webpack.LoaderOptionsPlugin({
            // add debug messages
            debug: !isProd,
            minimize: isProd,
            /**
             * PostCSS
             * Reference: https://github.com/postcss/autoprefixer-core
             * Add vendor prefixes to your css
             */
            postcss: [
                autoprefixer({
                    browsers: ['last 2 version']
                })
            ]
        }),

        // Workaround to remove Webpack warning in system_js_ng_module_factory_loader.js
        // See https://github.com/angular/angular/issues/11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('demo', 'src', 'app')
        )
    ];

    // Add build specific plugins
    if (isProd) {
        config.optimization.minimize = true;
        config.optimization.minimizer = [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    mangle: true,
                    output: {
                        comments: false
                    }
                }
            })
        ];
        config.plugins.push(
            // Extract css files
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Disabled when in test mode or not in build mode
            new MiniCssExtractPlugin({
                filename: 'css/[name].[hash].css'
            }),

            // Reference: https://github.com/angular/angular-cli/tree/master/packages/webpack
            new ngToolsWebpack.AngularCompilerPlugin({
                tsConfigPath: './tsconfig-aot.json',
                entryModule: root('demo/src/app/') + 'app.module#NgtsdModule'
            }),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoEmitOnErrorsPlugin(),

            // Copy assets from the public folder
            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: root('demo/src/public')
            }])
        );
    }

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: 'demo/src/public',
        historyApiFallback: true,
        stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
    };

    return config;
}();

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
