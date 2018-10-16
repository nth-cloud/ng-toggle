# NG v2+ Toggle

[![npm version](https://badge.fury.io/js/ngx-toggle.svg)](https://badge.fury.io/js/ngx-toggle)
[![Build Status](https://travis-ci.org/ngx-toggle/ngx-toggle.svg?branch=master)](https://travis-ci.org/ngx-toggle/ngx-toggle)
[![dependency Status](https://david-dm.org/ngx-toggle/ngx-toggle.svg?branch=master)](https://david-dm.org/ngx-toggle/ngx-toggle)
[![devDependency Status](https://david-dm.org/ngx-toggle/ngx-toggle/dev-status.svg?branch=master)](https://david-dm.org/ngx-toggle/ngx-toggle#info=devDependencies)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/trickeyone.svg)](https://saucelabs.com/u/trickeyone)

[![NPM](https://nodei.co/npm/ngx-toggle.png?compact=true)](https://www.npmjs.com/package/ngx-toggle)

Angular v2+ Bootstrap-styled Toggle that can be used as a standalone toggle or can convert checkboxes into UI toggles.

## Demo

View it in action at https://ngx-toggle.github.io

## Dependencies
* [Angular](https://angular.io) (tested with 6.1.10)
* [Bootstrap 4](https://www.getbootstrap.com) (tested with 4.1.3)

## Installation
After installing the above dependencies, install `ngx-toggle` via:
```shell
npm install --save ngx-toggle
```

Import the main module into your project:
```js
import {NgxToggleModule} from "ngx-toggle";
```

Import the module into your application:
```js
import {NgxToggleModule} from "ngx-toggle";

@NgModule({
    ...
    imports: [NgxToggleModule, ...],
    ...
})
export class AppModule {
}
```

If you are using SystemJS, you should adjust your configuration to point to the UMD bundle.

In your systemJS config file, `map` needs to tell the System loader where to look for `ngx-toggle`:
```js
map: {
   'ngx-toggle/ngx-toggle': 'node_modules/ngx-toggle/ngx-toggle/bundles/ngx-toggle.js' 
}
```

## Supported browsers
We support the same browsers and versions supported by both Bootstrap 4 and Angular, whichever is _more_ restrictive.
See [this](https://github.com/angular/angular/blob/master/README.md) for up-to-date Angular browser support.

* Chrome (45+)
* Firefox (40+)
* IE (10+)
* Edge (20+)
* Safari (7+)

Also, check [Bootstrap 4's notes](https://getbootstrap.com/docs/4.0/getting-started/browsers-devices/#supported-browsers) on supported browsers.

### Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com)
