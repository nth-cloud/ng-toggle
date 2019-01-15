import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {ComponentWrapper} from './component-wrapper/component-wrapper.component';
import {PageWrapper} from './page-wrapper/page-wrapper.component';
import {Analytics} from './analytics/analytics';
import {NthdCodeComponent} from './code/code.component';
import {CodeHighlightService} from './code/code-highlight.service';
import {NthdTab, NthdTabContent, NthdTabTitle, NthdTabVerbose} from './tabs/tab.component';
import {NthdTabs} from './tabs/tabs.component';
import {NthdInternalOutlet} from './tabs/outlet';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    RouterModule,
    ComponentWrapper,
    PageWrapper,
    NthdCodeComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NthdTab, NthdTabs, NthdTabVerbose, NthdTabContent, NthdTabTitle, NthdInternalOutlet
  ],
  declarations: [
    ComponentWrapper,
    PageWrapper,
    NthdCodeComponent,
    NthdTab, NthdTabs, NthdTabVerbose, NthdTabContent, NthdTabTitle, NthdInternalOutlet
  ],
  providers: [Analytics, CodeHighlightService]
})
export class NthdSharedModule {
}
