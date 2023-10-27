const reporters = process.env.CI ? [ 'dots' ] : [ 'progress' ];
const browsers = process.env.CI ? [ 'ChromeHeadlessNoSandbox' ] : [ 'Chrome' ];

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [ 'jasmine', '@angular-devkit/build-angular' ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContent: false,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '..', 'coverage'),
      reporters: [ { type: 'html' }, { type: 'json' }, { type: 'lcovonly' } ],
      fixWebpackSourcePaths: true,
    },
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [ '--no-sandbox' ],
      },
    },
    reporters,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers,
    singleRun: false,
    restartOnFileChange: true,
    browserNoActivityTimeout: 20000,
  });
};
