import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'a[nthFragment]',
  host: {
    '[class.title-fragment]': 'true',
    '[attr.id]': 'fragment'
  }
})
export class NthdFragment {
  @Input() fragment: string;
}
