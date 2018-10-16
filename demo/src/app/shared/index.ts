import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ComponentWrapper} from './component-wrapper/component-wrapper.component';
import {PageWrapper} from './page-wrapper/page-wrapper.component';
import {Analytics} from './analytics/analytics';
import {NgxdCodeComponent} from './code/code.component';
import {CodeHighlightService} from './code/code-highlight.service';

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule],
    exports: [
        CommonModule,
        RouterModule,
        ComponentWrapper,
        PageWrapper,
        NgxdCodeComponent,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        ComponentWrapper,
        PageWrapper,
        NgxdCodeComponent
    ],
    providers: [Analytics, CodeHighlightService]
})
export class NgxdSharedModule {
}
