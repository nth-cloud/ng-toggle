
export * from './toggle.component';

import {NgModule} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {NgxToggleModule} from 'ngx-toggle';
import {NgbdSharedModule} from '../../shared';
import {NgbdComponentsSharedModule} from '../shared';
import {NgxdToggle} from './toggle.component';
import {DEMO_DIRECTIVES} from './demos';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule, NgxToggleModule, NgbModule],
  exports: [NgxdToggle],
  declarations: [NgxdToggle, ...DEMO_DIRECTIVES]
})
export class NgxdToggleModule {}
