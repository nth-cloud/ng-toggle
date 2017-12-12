export * from './toggle-switch';

import {NgModule} from '@angular/core';
import {NgbdSharedModule} from '../shared';
import {NgtsdToggleSwitchModule} from './toggle-switch';

@NgModule({
  imports: [
    NgbdSharedModule,
    NgtsdToggleSwitchModule
  ],
  exports: [
    NgtsdToggleSwitchModule
  ]
})
export class NgtsdDemoModule {}
