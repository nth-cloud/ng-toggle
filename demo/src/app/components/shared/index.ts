import {NgModule} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {NgbdSharedModule} from '../../shared';
import {ExampleBoxComponent} from './example-box';
import {NgbdApiDocs, NgbdApiDocsBadge, NgbdApiDocsClass, NgbdApiDocsConfig} from './api-docs';
import {NgbdFragment} from './fragment';

@NgModule({
  imports: [NgbdSharedModule, NgbModule],
  declarations: [ExampleBoxComponent, NgbdApiDocsBadge, NgbdApiDocs, NgbdApiDocsClass, NgbdApiDocsConfig, NgbdFragment],
  exports: [ExampleBoxComponent, NgbdApiDocsBadge, NgbdApiDocs, NgbdApiDocsClass, NgbdApiDocsConfig, NgbdFragment]
})
export class NgbdComponentsSharedModule {}
