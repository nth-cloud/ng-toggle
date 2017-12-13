import {Component} from '@angular/core';
import {DEMO_SNIPPETS} from './demos';

@Component({
  selector: 'ngxd-toggle',
  template: `
    <ngbd-component-wrapper component="Toggle">
      <ngbd-api-docs directive="NgxToggle"></ngbd-api-docs>
      <ngbd-example-box demoTitle="Toggle Basic" [snippets]="snippets" component="toggle" demo="basic">
        <ngxd-toggle-basic></ngxd-toggle-basic>
      </ngbd-example-box>
      <ngbd-example-box demoTitle="Toggle Checkbox" [snippets]="snippets" component="toggle" demo="input">
        <ngxd-toggle-input></ngxd-toggle-input>
      </ngbd-example-box>
    </ngbd-component-wrapper>
  `
})
export class NgxdToggle {
  snippets = DEMO_SNIPPETS;
}
