import { Component } from '@angular/core';

@Component({
  selector: 'nthd-toggle-basic',
  templateUrl: './toggle-basic.html'
})
export class NthdToggleBasic {
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
