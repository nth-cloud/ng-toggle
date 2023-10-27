import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { ClassDesc, MethodDesc, signature } from './api-docs.model';
import { AnalyticsService } from '../../services/analytics.service';
import apiDocs from '../../../api-docs';
import { NthdApiDocsBadge } from './api-docs-badge.component';
import { NthdFragment } from '../fragment/fragment.directive';

/**
 * Displays the API docs of a class, which is not a directive.
 *
 * For Config services, use NthdApiDocsConfig instead.
 */
@Component({
	selector: 'nthd-api-docs-class',
	standalone: true,
	imports: [RouterLink, NthdApiDocsBadge, NgIf, NgFor, NthdFragment],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './api-docs-class.component.html',
	styles: [
		`
			.label-cell {
				width: 25%;
			}
			.content-cell {
				width: 75%;
			}
		`,
	],
})
export class NthdApiDocsClass {
	apiDocs: ClassDesc;

	@Input()
	set type(value: string) {
		this.apiDocs = apiDocs[value];
	}

	constructor(private _analytics: AnalyticsService) {}

	methodSignature(method: MethodDesc): string {
		return signature(method);
	}

	trackSourceClick() {
		this._analytics.trackEvent('Source File View', this.apiDocs.className);
	}
}
