import { Directive, Input } from '@angular/core';

@Directive({
  standalone: true,
	selector: 'a[nthdFragment]',
	host: {
		'[class.title-fragment]': 'true',
		'[attr.id]': 'fragment',
	},
})
export class NthdFragment {
	@Input() fragment: string;
}
