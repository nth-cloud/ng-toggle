export * from './toggle';

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgxToggle} from './toggle';

const EXPORT_DIRECTIVES = [NgxToggle];

@NgModule({imports: [CommonModule], exports: EXPORT_DIRECTIVES, declarations: EXPORT_DIRECTIVES})
export class NgxToggleModule {
}
