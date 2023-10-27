import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NthdApiDocsBadge } from './api-docs-badge.component';
import { NgFor, NgIf } from '@angular/common';
import { NthdFragment } from '../fragment/fragment.directive';
import { ClassDesc } from './api-docs.model';
import { AnalyticsService } from '../../services/analytics.service';
import apiDocs from '../../../api-docs';

const CONFIG_SUFFIX_LENGTH = 'Config'.length;

@Component({
	selector: 'nthd-api-docs-config',
	standalone: true,
	imports: [RouterLink, NthdApiDocsBadge, NgFor, NgIf, NthdFragment],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './api-docs-config.component.html',
})
export class NthdApiDocsConfig {
	apiDocs: ClassDesc;
	directiveName: string;

	@Input()
	set type(value: string) {
		this.apiDocs = apiDocs[value];
		this.directiveName = value.slice(0, -CONFIG_SUFFIX_LENGTH);
	}

	constructor(private _analytics: AnalyticsService) {}

	public trackSourceClick() {
		this._analytics.trackEvent('Source File View', this.apiDocs.className);
	}
}
