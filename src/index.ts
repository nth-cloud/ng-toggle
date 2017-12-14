export * from './toggle';

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgxToggle, NgxToggleLabel} from './toggle';

const EXPORT_DIRECTIVES = [NgxToggle, NgxToggleLabel];

@NgModule({imports: [CommonModule], exports: EXPORT_DIRECTIVES, declarations: EXPORT_DIRECTIVES})
export class NgxToggleModule {
}
