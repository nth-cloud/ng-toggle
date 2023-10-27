import { Component, ContentChildren, Input, NgZone, QueryList } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { NthdPageHeaderComponent } from './page-header.component';
import { TableOfContents } from '../component-wrapper/component-wrapper.component';
import { NthdSideNavComponent } from '../side-nav/side-nav.component';

@Component({
	selector: 'nthd-page-wrapper',
	standalone: true,
	imports: [NgIf, NgFor, RouterLink, NthdSideNavComponent, NgbCollapseModule, NgbDropdownModule],
	templateUrl: './page-wrapper.component.html',
})
export class NthdPageWrapper {
	@Input() public pageTitle: string;

	@ContentChildren(NthdPageHeaderComponent) private _tableOfContents: QueryList<NthdPageHeaderComponent>;

	sidebarCollapsed = true;
	isLargeScreenOrLess: boolean;

	constructor(zone: NgZone) {
		const largeScreenQL = matchMedia('(max-width: 1199.98px)');
		this.isLargeScreenOrLess = largeScreenQL.matches;
		// eslint-disable-next-line deprecation/deprecation
		largeScreenQL.addListener((event) => zone.run(() => (this.isLargeScreenOrLess = event.matches)));
	}

	get tableOfContents(): TableOfContents {
		return this._tableOfContents ? this._tableOfContents.toArray() : [];
	}
}
