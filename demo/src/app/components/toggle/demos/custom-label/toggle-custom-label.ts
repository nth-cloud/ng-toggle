import { Component } from '@angular/core';

@Component({
  selector: 'ngxd-toggle-custom-label',
  templateUrl: './toggle-custom-label.html',
  styles: [
      '@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");'
  ]
})
export class NgxdToggleCustomLabel {
  model: any = {
    onColor: 'primary',
    offColor: 'secondary',
    offText: 'Off',
    disabled: false,
    size: '',
    value: null
  };
}
