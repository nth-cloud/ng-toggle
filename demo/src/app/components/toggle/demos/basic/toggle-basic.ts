import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";
import { NgToggleModule } from "@nth-cloud/ng-toggle";

@Component({
	selector: 'nthd-toggle-basic',
  standalone: true,
  imports: [NgToggleModule, FormsModule, JsonPipe],
	templateUrl: './toggle-basic.html',
})
export class NthdToggleBasic {
	model: {size: '' | 'lg' | 'sm'} | any = {
		onColor: 'primary',
		offColor: 'secondary',
		onText: 'On',
		offText: 'Off',
		disabled: false,
		size: '',
		value: null,
	};
}
