# NG-TOGGLE - Native Angular components & directives for Bootstrap-styled Toggle Switch 

[![npm version](https://badge.fury.io/js/%40nth-cloud%2Fng-toggle.svg)](https://badge.fury.io/js/%40nth-cloud%2Fng-toggle)
[![Build Status](https://travis-ci.org/nth-cloud/ng-toggle.svg?branch=master)](https://travis-ci.org/nth-cloud/ng-toggle)
[![codecov](https://codecov.io/gh/nth-cloud/ng-toggle/branch/master/graph/badge.svg)](https://codecov.io/gh/nth-cloud/ng-toggle)
[![dependency Status](https://david-dm.org/nth-cloud/ng-toggle.svg?branch=master)](https://david-dm.org/nth-cloud/ng-toggle)
[![devDependency Status](https://david-dm.org/nth-cloud/ng-toggle/dev-status.svg?branch=master)](https://david-dm.org/nth-cloud/ng-toggle#info=devDependencies)
[![Sauce Test Status](https://saucelabs.com/buildstatus/trickeyone)](https://saucelabs.com/u/trickeyone)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/trickeyone.svg)](https://saucelabs.com/u/trickeyone)

Angular Bootstrap-styled Toggle component that can be used as a standalone toggle or can convert checkboxes into UI toggles.

## Demo

View it in action at https://nth-cloud.github.io/ng-toggle

## Dependencies
* [Angular](https://angular.io) (tested with 10.0.0)
* [Bootstrap 4](https://www.getbootstrap.com) (tested with 4.5.0)

| ng-toggle | Angular | Bootstrap CSS |
| --------- | ------- | ------------- |
| 1.x.x     | 5.2.1   | 4.0.0         |
| 2.x.x     | 6.1.0   | 4.0.0         |
| 3.x.x     | 7.0.0   | 4.0.0         |
| 4.x.x     | 8.0.0   | 4.0.0         |
| 5.x.x     | 9.0.0   | 4.0.0         |
| 6.x.x     | 10.0.0  | 4.0.0         |

## Installation
After installing the above dependencies, install `ng-toggle` via:
```shell
npm install --save @nth-cloud/ng-toggle
```

Import the main module into your project:
```js
import {NgToggleModule} from '@nth-cloud/ng-toggle';
```

Import the module into your application:
```js
import {NgToggleModule} from '@nth-cloud/ng-toggle';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgToggleModule, ...],
  bootstrap: [AppComponent]
})
export class AppModule {
}

```

If you are using SystemJS, you should adjust your configuration to point to the UMD bundle.

In your systemJS config file, `map` needs to tell the System loader where to look for `ngx-toggle`:
```js
map: {
  '@nth-cloud/ng-toggle': 'npm:@nth-cloud/ng-toggle/dist/bundles/ng-toggle.js',
}
```

## Supported browsers
We support the same browsers and versions supported by both Bootstrap 4 and Angular, whichever is _more_ restrictive.
See [this](https://github.com/angular/angular/blob/master/README.md) for up-to-date Angular browser support.

* Chrome (45+)
* Firefox (40+)
* IE (10+)
* Edge (20+)
* Safari (10+)

Also, check [Bootstrap 4's notes](https://getbootstrap.com/docs/4.0/getting-started/browsers-devices/#supported-browsers) on supported browsers.

### Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com)
