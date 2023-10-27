import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {filter, map} from 'rxjs/operators';

import { AnalyticsService } from './services/analytics.service';

@Component({
  standalone: true,
	selector: 'nthd-app',
	templateUrl: './app.component.html',
	imports: [RouterLink, RouterLinkActive, RouterOutlet],
})
export class AppComponent implements OnInit {
  navbarCollapsed = true;
  downloadCount: string = '';

  constructor(
    private _analytics: AnalyticsService,
    route: ActivatedRoute,
    vps: ViewportScroller,
    zone: NgZone,
    httpClient: HttpClient,
  ) {
		route.fragment
			.pipe(filter((fragment) => !!fragment))
			.subscribe((fragment: string) =>
				zone.runOutsideAngular(() => requestAnimationFrame(() => vps.scrollToAnchor(fragment))),
			);

    httpClient
      .get<{ downloads: string }>('https://api.npmjs.org/downloads/point/last-month/@nth-cloud/ng-toggle')
      .pipe(map((data) => data?.downloads))
      .subscribe({ next: (count) => (this.downloadCount = count.toLocaleString()), error: () => of('') });
	}

	ngOnInit(): void {
		this._analytics.trackPageViews();
	}
}
