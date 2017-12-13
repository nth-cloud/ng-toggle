
export * from './toggle.component';

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {NgxToggleModule} from 'ngx-toggle';
import {NgbdSharedModule} from '../../shared';
import {NgbdComponentsSharedModule} from '../shared';
import {NgxdToggle} from './toggle.component';
import {DEMO_DIRECTIVES} from './demos';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule, NgxToggleModule],
  exports: [NgxdToggle],
  declarations: [NgxdToggle, ...DEMO_DIRECTIVES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxdToggleModule {}
