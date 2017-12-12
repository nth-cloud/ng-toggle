export * from './toggle-switch.component';

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {NgbdSharedModule} from '../../shared';
import {NgbdComponentsSharedModule} from '../shared';
import {NgtsdToggleSwitch} from './toggle-switch.component';
import {DEMO_DIRECTIVES} from './demos';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgtsdToggleSwitch],
  declarations: [NgtsdToggleSwitch, ...DEMO_DIRECTIVES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgtsdToggleSwitchModule {}
