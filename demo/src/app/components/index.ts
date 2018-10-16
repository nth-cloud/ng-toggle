export * from './toggle';

import {NgModule} from '@angular/core';

import {NgxdSharedModule} from '../shared';
import {NgxdToggleModule} from './toggle';

@NgModule({
  imports: [
    NgxdSharedModule,
    NgxdToggleModule
  ],
  exports: [
    NgxdToggleModule
  ]
})
export class NgxdDemoModule {}
