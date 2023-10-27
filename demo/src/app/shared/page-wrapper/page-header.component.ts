import { NthdOverviewSection } from '../overview/overview';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NthdFragment } from '../fragment/fragment.directive';

@Component({
	selector: 'nthd-page-header',
	standalone: true,
	imports: [RouterLink, NthdFragment],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'd-block',
	},
	template: `
		<h2>
			<a routerLink="." [fragment]="fragment" nthdFragment>
				<i class="bi bi-link-45deg" style="font-size: 1.75rem; color: black"></i>
			</a>
			{{ title }}
		</h2>
	`,
})
export class NthdPageHeaderComponent implements NthdOverviewSection {
	@Input() title: string;
	@Input() fragment: string;
}
