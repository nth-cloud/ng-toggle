import { Component } from '@angular/core';

@Component({
  selector: 'nthd-toggle-kitchen-sink',
  templateUrl: './toggle-kitchen-sink.html'
})
export class NthdToggleKitchenSink {
  model: any = {
    onColor: 'primary',
    offColor: 'secondary',
    onText: 'On',
    offText: 'Off',
    disabled: false,
    size: '',
    value: null
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
