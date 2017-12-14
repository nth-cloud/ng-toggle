import { Component } from '@angular/core';

@Component({
  selector: 'ngxd-toggle-basic',
  templateUrl: './toggle-basic.html'
})
export class NgxdToggleBasic {
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
