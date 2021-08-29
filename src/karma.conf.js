
const reporters = process.env.TRAVIS || process.env.GITHUB_WORKFLOW ? ['dots', 'coverage'] : ['progress', 'coverage'];
const browsers = process.env.TRAVIS || process.env.GITHUB_WORKFLOW ? ['ChromeHeadlessNoSandbox'] : ['Chrome'];
const env = process.env.TRAVIS || process.env.GITHUB_WORKFLOW ? 'prod' : 'dev';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContent: false
        },
        coverageReporter: {
            dir: require('path').join(__dirname, '..', 'coverage'),
            reporters: [{type: 'html'}, {type: 'json'}, {type: 'lcovonly'}],
            fixWebpackSourcePaths: true
        },
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        angularCli: {
            environment: env
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers,
        reporters,
        singleRun: false,
        browserDisconnectTimeout: 60000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 60000
    });
};
