import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";
import { NgToggleModule } from "@nth-cloud/ng-toggle";

@Component({
	selector: 'nthd-toggle-custom-label',
  standalone: true,
  imports: [NgToggleModule, FormsModule, JsonPipe],
	templateUrl: './toggle-custom-label.html',
	styles: ['@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");'],
})
export class NthdToggleCustomLabel {
	model: {size: '' | 'sm' | 'lg'} | any = {
		onColor: 'primary',
		offColor: 'secondary',
    onText: 'On',
		offText: 'Off',
		disabled: false,
		size: '',
		value: null,
	};
}
