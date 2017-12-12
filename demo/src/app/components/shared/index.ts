import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {NgbdSharedModule} from '../../shared';
import {ExampleBoxComponent} from './example-box';
import {NgbdApiDocs, NgbdApiDocsBadge, NgbdApiDocsClass, NgbdApiDocsConfig} from './api-docs';
import {NgbdFragment} from './fragment';

@NgModule({
  imports: [NgbdSharedModule],
  declarations: [ExampleBoxComponent, NgbdApiDocsBadge, NgbdApiDocs, NgbdApiDocsClass, NgbdApiDocsConfig, NgbdFragment],
  exports: [ExampleBoxComponent, NgbdApiDocsBadge, NgbdApiDocs, NgbdApiDocsClass, NgbdApiDocsConfig, NgbdFragment],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgbdComponentsSharedModule {}
