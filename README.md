# NG-TOGGLE 
### Native Angular components & directives for Bootstrap-styled Toggle Switch 

[![CodeQL](https://github.com/nth-cloud/ng-toggle/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/nth-cloud/ng-toggle/actions/workflows/codeql-analysis.yml)
[![npm version](https://badge.fury.io/js/%40nth-cloud%2Fng-toggle.svg)](https://badge.fury.io/js/%40nth-cloud%2Fng-toggle)
[![Build Status](https://travis-ci.org/nth-cloud/ng-toggle.svg?branch=master)](https://travis-ci.org/nth-cloud/ng-toggle)
[![codecov](https://codecov.io/gh/nth-cloud/ng-toggle/branch/master/graph/badge.svg)](https://codecov.io/gh/nth-cloud/ng-toggle)
[![dependency Status](https://david-dm.org/nth-cloud/ng-toggle.svg?branch=master)](https://david-dm.org/nth-cloud/ng-toggle)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/trickeyone.svg)](https://saucelabs.com/u/trickeyone)

Angular Bootstrap-styled Toggle component that can be used as a standalone toggle or can convert checkboxes into UI toggles.

## Demo

View it in action at https://nth-cloud.github.io/ng-toggle

## Dependencies
* [Angular](https://angular.io) (tested with 13.0.0)
* [Bootstrap 4](https://www.getbootstrap.com) (tested with 4.5.0)

| ng-toggle | Angular | Bootstrap CSS | Active Support |
|-----------|---------| ------------- |:---------:|
| 1.x.x     | 5.2.1   | 4.0.0         | :x: |
| 2.x.x     | 6.1.0   | 4.0.0         | :x: |
| 3.x.x     | 7.0.0   | 4.0.0         | :x: |
| 4.x.x     | 8.0.0   | 4.0.0         | :x: |
| 5.x.x     | 9.0.0   | 4.0.0         | :x: |
| 6.x.x     | 10.0.0  | 4.0.0         | :white_check_mark: |
| 7.x.x     | 11.0.0  | 4.0.0         | :white_check_mark: |
| 8.x.x     | 12.0.0  | 4.0.0         | :white_check_mark: |
| 9.x.x     | 13.0.0  | 4.0.0         | :white_check_mark: |

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
See [Angular Browser Support](https://github.com/angular/angular/blob/master/README.md) and [Bootstrap browser support](https://getbootstrap.com/docs/4.0/getting-started/browsers-devices/#supported-browsers) for more details.

Our code is automatically tested on all supported browsers. 

### Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com)
