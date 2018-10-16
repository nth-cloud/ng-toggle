import {Router, NavigationEnd} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Analytics} from './shared/analytics/analytics';

import '../style/app.scss';

@Component({
  selector: 'ngtsd-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  navbarCollapsed = true;

  constructor(private _analytics: Analytics, router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const { fragment } = router.parseUrl(router.url);
        if (fragment) {
          const element = document.querySelector(`#${fragment}`);
          if (element) {
            element.scrollIntoView();
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this._analytics.trackPageViews();
  }
}
