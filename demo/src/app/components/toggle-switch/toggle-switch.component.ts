import {Component} from '@angular/core';
import {DEMO_SNIPPETS} from './demos';

@Component({
  selector: 'ngtsd-toggle-switch',
  template: `
    <ngbd-component-wrapper component="Toggle Switch">
      <ngbd-api-docs directive="NgToggleSwitch"></ngbd-api-docs>
      <ngbd-example-box demoTitle="Toggle Switch" [snippets]="snippets" component="toggle-switch" demo="basic">
        <ngtsd-toggle-switch-basic></ngtsd-toggle-switch-basic>
      </ngbd-example-box>
      <ngbd-example-box demoTitle="Checkbox Toggle Switch" [snippets]="snippets" component="toggle-switch" demo="checkbox">
        <ngtsd-toggle-switch-input></ngtsd-toggle-switch-input>
      </ngbd-example-box>
    </ngbd-component-wrapper>
  `
})
export class NgtsdToggleSwitch {
  snippets = DEMO_SNIPPETS;
}
