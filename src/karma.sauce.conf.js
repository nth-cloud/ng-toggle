
const BROWSERS = {
  'CHROME': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest'
  },
  'FIREFOX': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest'
  },
  'EDGE': {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: 'latest'
  },
  'EDGE18': {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: '18.17763'
  },
  'IE10': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10'
  },
  'IE11': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },
  'SAFARI12': {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'macOS 10.14',
    version: '12'
  },
  'SAFARI13': {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'macOS 10.15',
    version: '13'
  },
};

module.exports = function (config) {
  config.set({
    basePath: '',
    files: ['../node_modules/bootstrap/dist/css/bootstrap.min.css'],
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-sauce-launcher'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    sauceLabs: {
      build: `GITHUB #${process.env.GITHUB_RUN_ID} (${process.env.GITHUB_JOB})`,
      tunnelIdentifier: process.env.GITHUB_RUN_ID,
      testName: 'ng-toggle',
      retryLimit: 3,
      startConnect: false,
      recordVideo: false,
      recordScreenshots: false,
      options: {
        commandTimeout: 600,
        idleTimeout: 600,
        maxDuration: 5400
      }
    },

    customLaunchers: BROWSERS,

    reporters: ['dots', 'saucelabs'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['CHROME', 'FIREFOX', 'EDGE', 'EDGE18', 'SAFARI12', 'SAFARI13'],
    singleRun: true,
    captureTimeout: 180000,
    browserDisconnectTimeout: 180000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 300000
  });
};
