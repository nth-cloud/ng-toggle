export * from './toggle';

import {NgModule} from '@angular/core';
import {NgbdSharedModule} from '../shared';
import {NgxdToggleModule} from './toggle';

@NgModule({
  imports: [
    NgbdSharedModule,
    NgxdToggleModule
  ],
  exports: [
    NgxdToggleModule
  ]
})
export class NgxdDemoModule {}
