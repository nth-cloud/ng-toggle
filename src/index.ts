import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {NgToggle} from './toggle';
import {NgToggleAccessor} from './toggle-accessor';
import {NgToggleLabel} from './toggle-label';

export {NgToggle} from './toggle';
export {NgToggleAccessor} from './toggle-accessor';
export {NgToggleLabel} from './toggle-label';

const declarations = [
  NgToggle,
  NgToggleAccessor,
  NgToggleLabel,
];

@NgModule(
    {imports: [CommonModule], exports: declarations, declarations: declarations, schemas: [CUSTOM_ELEMENTS_SCHEMA]})
export class NgToggleModule {
}
