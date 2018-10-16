import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgxdSharedModule} from '../../shared';
import {ExampleBoxComponent} from './example-box';
import {NgxdApiDocs, NgxdApiDocsBadge, NgxdApiDocsClass, NgxdApiDocsConfig} from './api-docs';
import {NgxdFragment} from './fragment';

@NgModule({
  imports: [NgxdSharedModule, NgbModule],
  declarations: [ExampleBoxComponent, NgxdApiDocsBadge, NgxdApiDocs, NgxdApiDocsClass, NgxdApiDocsConfig, NgxdFragment],
  exports: [ExampleBoxComponent, NgxdApiDocsBadge, NgxdApiDocs, NgxdApiDocsClass, NgxdApiDocsConfig, NgxdFragment]
})
export class NgxdComponentsSharedModule {}
