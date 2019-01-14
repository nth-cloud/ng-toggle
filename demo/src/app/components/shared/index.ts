import {NgModule} from '@angular/core';

import {NthdSharedModule} from '../../shared';
import {ExampleBoxComponent} from './example-box';
import {NthdApiDocs, NthdApiDocsBadge, NthdApiDocsClass, NthdApiDocsConfig} from './api-docs';
import {NthdFragment} from './fragment';

const declarations = [
  ExampleBoxComponent, NthdApiDocsBadge, NthdApiDocs, NthdApiDocsClass, NthdApiDocsConfig, NthdFragment
];

@NgModule({
  imports: [NthdSharedModule],
  declarations: declarations,
  exports: declarations
})
export class NthdComponentsSharedModule {}
