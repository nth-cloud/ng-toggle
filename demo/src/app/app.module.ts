import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NgToggleSwitchModule} from 'ng-toggle-switch';

import {DefaultComponent} from './default';
import {GettingStarted} from './getting-started';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {NgtsdDemoModule} from './components';
import {NgbdSharedModule} from './shared';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    GettingStarted
  ],
  imports: [
    BrowserModule,
    routing,
    NgToggleSwitchModule,
    NgtsdDemoModule,
    NgbdSharedModule,
    NgbModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class NgtsdModule {
}
