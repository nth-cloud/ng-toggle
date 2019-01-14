import { Component, Input } from '@angular/core';
import {Analytics} from '../../../shared/analytics/analytics';

@Component({
  selector: 'nthd-example-box',
  templateUrl: './example-box.component.html'
})
export class ExampleBoxComponent {
  @Input() title: string;
  @Input() component: string;
  @Input() id: string;
  @Input() demo: string;
  @Input() snippets: Object;

  constructor(private _analytics: Analytics) {}

  trackStackBlitzClick() {
    this._analytics.trackEvent('StackBlitz View', this.component + ' ' + this.id);
  }

  trackPlunkrClick() {
    this._analytics.trackEvent('Plunkr View', this.component + ' ' + this.id);
  }
}
