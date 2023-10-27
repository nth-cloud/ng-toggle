import { Component } from '@angular/core';
import { NgComponentOutlet, NgFor } from '@angular/common';

import { NthdDemoComponent } from './demo.component';
import { NthdDemoListService } from '../../services/demo-list.service';

@Component({
	standalone: true,
	imports: [NthdDemoComponent, NgComponentOutlet, NgFor],
	template: `
		<nthd-demo
			*ngFor="let demo of demos"
			[id]="demo.id"
			[demoTitle]="demo.title"
			[code]="demo.code"
			[markup]="demo.markup"
			[component]="component"
			[files]="demo.files"
			[showCode]="demo.showCode"
			[showStackblitz]="demo.showStackblitz ?? true"
		>
			<ng-template [ngComponentOutlet]="demo.type"></ng-template>
		</nthd-demo>
	`,
})
export class NthdExamplesPage {
	component: string = 'toggle';
	demos: any = [];

	constructor(demoList: NthdDemoListService) {
		// We go up to parent route defining /components/:widget to read the widget name
		// This route is declared in root app.routing.ts.
		const componentName = this.component;
		if (componentName) {
			const demos = demoList.getDemos(componentName);
			if (demos) {
				this.demos = Object.keys(demos).map((id) => {
					return { id, ...demos[id] };
				});
			}
		}
	}
}
