import { Component } from '@angular/core';

@Component({
  selector: 'ngxd-toggle-input',
  templateUrl: './toggle-input.html'
})
export class NgxdToggleInput {
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
