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
    offText: 'Off'
  };

  colors: any = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  setOnColor(event: MouseEvent, color: string) {
    event.preventDefault();
    event.stopPropagation();
    this.model.onColor = color;
  }

  setOffColor(event: MouseEvent, color: string) {
    event.preventDefault();
    event.stopPropagation();
    this.model.offColor = color;
  }
}
