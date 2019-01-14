import { Component } from '@angular/core';

@Component({
  selector: 'nthd-toggle-input',
  templateUrl: './toggle-input.html'
})
export class NthdToggleInput {
  model: any = {
    onColor: 'primary',
    offColor: 'secondary',
    onText: 'On',
    offText: 'Off',
    disabled: false,
    size: '',
    value: null
  };
}
