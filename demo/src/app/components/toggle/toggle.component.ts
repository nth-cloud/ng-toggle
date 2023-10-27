import { Component } from '@angular/core';
import { DEMO_SNIPPETS } from './demos';

@Component({
	selector: 'nthd-toggle',
	template: `
		<nthd-component-wrapper component="Toggle">
			<nthd-api-docs directive="NgToggleComponent"></nthd-api-docs>
			<nthd-api-docs directive="NgToggleLabelDirective"></nthd-api-docs>
			<nthd-example-box title="Basic" [snippets]="snippets" component="toggle" demo="basic" id="basic">
				<nthd-toggle-basic></nthd-toggle-basic>
			</nthd-example-box>
			<nthd-example-box title="Checkbox" [snippets]="snippets" component="toggle" demo="input" id="input">
				<nthd-toggle-input></nthd-toggle-input>
			</nthd-example-box>
			<nthd-example-box
				title="Custom Label"
				[snippets]="snippets"
				component="toggle"
				demo="custom-label"
				id="custom-label"
			>
				<nthd-toggle-custom-label></nthd-toggle-custom-label>
			</nthd-example-box>
			<nthd-example-box
				title="Everything... and the kitchen sink"
				[snippets]="snippets"
				component="toggle"
				demo="kitchen-sink"
				id="kitchen-sink"
			>
				<nthd-toggle-kitchen-sink></nthd-toggle-kitchen-sink>
			</nthd-example-box>
		</nthd-component-wrapper>
	`,
})
export class NthdToggleComponent {
	snippets = DEMO_SNIPPETS;
}
