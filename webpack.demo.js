let path = require('path');
let webpack = require('webpack');
let rxPaths = require('rxjs/_esm5/path-mapping');

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
     * Reference: https://webpack.js.org/configuration
     * This is the object where all configuration gets set
     */
    let config = {};

    /**
     * Devtool
     * Reference: https://webpack.js.org/configuration/devtool
     * Type of sourcemap to use per build type
     */
    if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    /**
     * Entry
     * Reference: https://webpack.js.org/concepts/entry-points
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
     * Reference: https://webpack.js.org/concepts/output
     */
    config.output = {
        path: root('demo', 'dist'),
        publicPath: '/',
        filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
        chunkFilename: isProd ? 'js/[id].[hash].chunk.js' : 'js/[id].chunk.js'
    };

    // allow tree shaking of pipeable operators.
    // See https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md#build-and-treeshaking
    let alias = rxPaths();
    alias['ngx-toggle'] = root('src/index.ts');

    /**
     * Resolve
     * Reference: https://webpack.js.org/configuration/resolve
     */
    config.resolve = {
        modules: [root('demo'), 'node_modules'],
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.css', '.scss', '.html'],

        alias: alias
    };

    /**
     * Loaders
     * Reference: https://webpack.js.org/concepts/loaders
     * List: https://webpack.js.org/loaders/
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
            // use 'null' loader in test mode (https://webpack.js.org/loaders/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.css$/,
                exclude: root('demo', 'src', 'app'),
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader?sourceMap-loader',
                    'postcss-loader',
                ]
            },
            // all css required in src/app files will be merged in js files
            {
                test: /\.css$/,
                include: root('demo', 'src', 'app'),
                use: [
                    'raw-loader',
                    'postcss-loader',
                ]
            },

            // support for .scss files
            // use 'null' loader in test mode (https://webpack.js.org/loaders/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.scss$/,
                exclude: root('src', 'app'),
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
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
     * Reference: https://webpack.js.org/configuration/plugins
     * List: https://webpack.js.org/plugins/
     */
    config.plugins = [
        // Define env variables to help with builds
        // Reference: https://webpack.js.org/plugins/define-plugin
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
        ),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        }),
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
            // Reference: https://github.com/angular/angular-cli/tree/master/packages/webpack
            new ngToolsWebpack.AngularCompilerPlugin({
                tsConfigPath: './tsconfig-aot.json',
                entryModule: root('demo/src/app/') + 'app.module#NgtsdModule'
            }),

            // Reference: https://webpack.js.org/list-of-plugins/noerrorsplugin
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
     * Reference: https://webpack.js.org/configuration/devserver
     * Reference: https://webpack.js.org/webpack-dev-server/
     */
    config.devServer = {
        contentBase: 'demo/dist',
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
