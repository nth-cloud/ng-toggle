import { Component } from '@angular/core';

import { environment } from '../../environments/environment';
import { Snippet } from '../services/snippet';
import { NthdCodeComponent } from '../shared/code/code.component';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'nthd-default',
	standalone: true,
	imports: [NthdCodeComponent, RouterLink],
	templateUrl: './default.component.html',
})
export class DefaultComponent {
	public version: string = environment.version;

	installation = Snippet({
		lang: 'ts',
		code: `// Installation for Angular CLI
ng add @nth-cloud/ng-toggle`,
	});
}
