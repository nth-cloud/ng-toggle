export * from './toggle-switch';
export * from './toggle-switch-input';

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgToggleSwitch} from './toggle-switch';
import {NgToggleSwitchInput} from './toggle-switch-input';

const EXPORT_DIRECTIVES = [NgToggleSwitch, NgToggleSwitchInput];

@NgModule({imports: [CommonModule], exports: EXPORT_DIRECTIVES, declarations: EXPORT_DIRECTIVES})
export class NgToggleSwitchModule {
}
