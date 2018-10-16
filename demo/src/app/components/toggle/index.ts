
export * from './toggle.component';

import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgxToggleModule} from 'ngx-toggle';
import {NgxdSharedModule} from '../../shared';
import {NgxdComponentsSharedModule} from '../shared';
import {NgxdToggle} from './toggle.component';
import {DEMO_DIRECTIVES} from './demos';

@NgModule({
  imports: [NgxdSharedModule, NgxdComponentsSharedModule, NgxToggleModule, NgbModule],
  exports: [NgxdToggle],
  declarations: [NgxdToggle, ...DEMO_DIRECTIVES]
})
export class NgxdToggleModule {}
