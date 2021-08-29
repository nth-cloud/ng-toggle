import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgToggleComponent} from './toggle';
import {NgToggleAccessorDirective} from './toggle-accessor';
import {NgToggleLabelDirective} from './toggle-label';

export {NgToggleComponent} from './toggle';
export {NgToggleAccessorDirective} from './toggle-accessor';
export {NgToggleLabelDirective} from './toggle-label';

const declarations = [
    NgToggleComponent,
    NgToggleAccessorDirective,
    NgToggleLabelDirective,
];

@NgModule({imports: [CommonModule], exports: declarations, declarations})
export class NgToggleModule {
}
