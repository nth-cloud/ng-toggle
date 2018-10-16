import {Component} from '@angular/core';
import {DEMO_SNIPPETS} from './demos';

@Component({
  selector: 'ngxd-toggle',
  template: `
    <ngxd-component-wrapper component="Toggle">
      <ngxd-api-docs directive="NgxToggle"></ngxd-api-docs>
      <ngxd-api-docs directive="NgxToggleLabel"></ngxd-api-docs>
      <ngxd-example-box demoTitle="Basic" [snippets]="snippets" component="toggle" demo="basic">
        <ngxd-toggle-basic></ngxd-toggle-basic>
      </ngxd-example-box>
      <ngxd-example-box demoTitle="Checkbox" [snippets]="snippets" component="toggle" demo="input">
        <ngxd-toggle-input></ngxd-toggle-input>
      </ngxd-example-box>
      <ngxd-example-box demoTitle="Custom Label" [snippets]="snippets" component="toggle" demo="custom-label">
        <ngxd-toggle-custom-label></ngxd-toggle-custom-label>
      </ngxd-example-box>
      <ngxd-example-box demoTitle="Everything... and the kitchen sink" [snippets]="snippets" component="toggle" demo="kitchen-sink">
        <ngxd-toggle-kitchen-sink></ngxd-toggle-kitchen-sink>
      </ngxd-example-box>
    </ngxd-component-wrapper>
  `
})
export class NgxdToggle {
  snippets = DEMO_SNIPPETS;
}
