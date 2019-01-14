import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {PrismComponent} from './default/prism.component';
import {DefaultComponent} from './default';
import {SupportComponent} from './support';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {NthdSharedModule} from './shared';
import {NthdToggleModule} from "./components/toggle";

@NgModule({
    declarations: [
        AppComponent,
        DefaultComponent,
        SupportComponent,
        PrismComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        NthdToggleModule,
        NthdSharedModule
    ],
    bootstrap: [AppComponent]
})
export class NthdModule {
}
