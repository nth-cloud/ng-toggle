import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'a[ngxdFragment]',
  host: {
    '[class.title-fragment]': 'true',
    '[attr.id]': 'fragment'
  }
})
export class NgxdFragment {
  @Input() fragment: string;
}
