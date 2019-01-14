
export * from './toggle.component';

import {NgModule} from '@angular/core';

import {NgToggleModule} from '@nth-cloud/ng-toggle';
import {NthdSharedModule} from '../../shared';
import {NthdComponentsSharedModule} from '../shared';
import {NthdToggleComponent} from './toggle.component';
import {DEMO_DIRECTIVES} from './demos';

@NgModule({
  imports: [NthdSharedModule, NthdComponentsSharedModule, NgToggleModule],
  exports: [NthdToggleComponent],
  declarations: [NthdToggleComponent, ...DEMO_DIRECTIVES]
})
export class NthdToggleModule {}
