# ng-toggle-switch

Angular v2+ Bootstrap-styled Toggle that can be used as a standalone toggle or can convert checkboxes into UI toggles.

## Dependencies
* [Angular](https://angular.io) (tested with 5.1.0)
* [Bootstrap 4](https://www.getbootstrap.com) (tested with 4.0.0-beta.2)

## Installation
After installing the above dependencies, install `ng-toggle-switch` via:
```shell
npm install --save ng-toggle-switch
```

Import the main module into your project:
```js
import {NgToggleSwitchModule} from "trickeyone/ng-toggle-switch";
```

You can import the module into your application either via the root (top-level) of your application (notice `NgToggleSwitchModule.forRoot()`):
```js
import {NgToggleSwitchModule} from "trickeyone/ng-toggle-switch";

@NgModule({
    ...
    imports: [NgToggleSwitchModule.forRoot(), ...],
    ...
})
export class AppModule {
}
```

Or you can import it only in the required modules:
```js
import {NgToggleSwitchModule} from "trickeyone/ng-toggle-switch";

@NgModule({
    ...
    imports: [NgToggleSwitchModule, ...],
    ...
})
export class OtherModule {
}
```

If you are using SystemJS, you should adjust your configuration to point to the UMD bundle.

In your systemJS config file, `map` needs to tell the System loader where to look for `ng-toggle-switch`:
```js
map: {
   'trickeyone/ng-toggle-switch': 'node_modules/trickeyone/ng-toggle-switch/bundles/ng-toggle-switch.js' 
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

