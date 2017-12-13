export * from './toggle';
export * from './toggle-input';

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgxToggle} from './toggle';
import {NgxToggleInput} from './toggle-input';

const EXPORT_DIRECTIVES = [NgxToggle, NgxToggleInput];

@NgModule({imports: [CommonModule], exports: EXPORT_DIRECTIVES, declarations: EXPORT_DIRECTIVES})
export class NgxToggleModule {
}
