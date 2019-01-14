import {MentionsModule} from '@nth-cloud/ng-toggle';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [MentionsModule, ...],
  bootstrap: [AppComponent]
})
export class AppModule {
}
