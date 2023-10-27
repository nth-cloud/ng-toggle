import { Component, NgZone, OnDestroy, Type } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgComponentOutlet, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { NthdSideNavComponent } from '../side-nav/side-nav.component';
import { environment } from '../../../environments/environment';
import { NthdExamplesPage } from '../examples-page/examples.component';
import { NthdApiPage } from '../api-page/api-page.component';

export type TableOfContents = { fragment: string; title: string }[];

@Component({
	standalone: true,
	imports: [
		NthdSideNavComponent,
		TitleCasePipe,
		NgbNavModule,
		NgbCollapseModule,
		RouterLink,
		NgFor,
		NgIf,
		AsyncPipe,
		NgComponentOutlet,
		RouterOutlet,
	],
	templateUrl: './component-wrapper.component.html',
})
export class ComponentWrapper implements OnDestroy {
	public activeTab: string = 'examples';

	public headerComponentType$: Observable<Type<any>>;
	public bootstrapUrl$: Observable<string>;

	public isLargeScreenOrLess: boolean;
	public isSmallScreenOrLess: boolean;

	public sidebarCollapsed = true;

	public tableOfContents: TableOfContents = [];

	private _routerSubscription: Subscription;

	constructor(public route: ActivatedRoute, private router: Router, zone: NgZone) {
		// This component is used in route definition 'components'
		// So next child route will always be ':componentType' & next one will always be ':pageType' (or tab)

		this._routerSubscription = this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				const tabRoute = this.route.snapshot.firstChild;

				this.activeTab = tabRoute!.url[0].path;
			});

		this.headerComponentType$ = this.route.data.pipe(map((data) => data?.header));
		this.bootstrapUrl$ = this.route.data.pipe(
			map((data) => data?.bootstrap?.replace('%version%', environment.bootstrap)),
		);

		// information extracted from https://getbootstrap.com/docs/4.1/layout/overview/
		// TODO: we should implements our own mediamatcher, according to bootstrap layout.
		const smallScreenQL = matchMedia('(max-width: 767.98px)');
		// eslint-disable-next-line deprecation/deprecation
		smallScreenQL.addListener((event) => zone.run(() => (this.isSmallScreenOrLess = event.matches)));
		this.isSmallScreenOrLess = smallScreenQL.matches;

		const largeScreenQL = matchMedia('(max-width: 1199.98px)');
		this.isLargeScreenOrLess = largeScreenQL.matches;
		// eslint-disable-next-line deprecation/deprecation
		largeScreenQL.addListener((event) => zone.run(() => (this.isLargeScreenOrLess = event.matches)));
	}

	public ngOnDestroy(): void {
		this._routerSubscription.unsubscribe();
	}

	public updateNavigation(component: NthdExamplesPage | NthdApiPage | any) {
		setTimeout(() => {
			const getLinks = (typeCollection: string[]) => {
				return typeCollection.map((item) => ({
					fragment: item,
					title: item,
				}));
			};
			this.tableOfContents = [];
			if (component instanceof NthdExamplesPage) {
				this.tableOfContents = component.demos.map((demo) => {
					return {
						fragment: demo.id,
						title: demo.title,
					};
				});
			} else if (component instanceof NthdApiPage) {
				let toc = getLinks(component.components);

				if (component.classes.length > 0) {
					const klasses = getLinks(component.classes);
					toc = toc.concat(toc.length > 0 ? [<any>{}, ...klasses] : klasses);
				}

				if (component.configs.length > 0) {
					const configs = getLinks(component.configs);
					toc = toc.concat(toc.length > 0 ? [<any>{}, ...configs] : configs);
				}

				this.tableOfContents = toc;
			} /* Overview */ else {
				// TODO: maybe we should also have an abstract class to test instanceof
				this.tableOfContents = Object.values(component.sections).map((section) => section) as TableOfContents;
			}
		}, 0);
	}
}
