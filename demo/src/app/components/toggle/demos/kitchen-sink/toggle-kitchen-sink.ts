import { Component } from '@angular/core';

interface KitchenSinkModel {
  handleColor: string|null;
  handleOnColor: string|null;
  handleOffColor: string|null;
  onColor: string;
  offColor: string;
  onText: string;
  offText: string;
  disabled: boolean;
  size: 'sm' | 'lg' | '';
  value: boolean;
}

@Component({
  selector: 'nthd-toggle-kitchen-sink',
  templateUrl: './toggle-kitchen-sink.html'
})
export class NthdToggleKitchenSink {
  model: KitchenSinkModel = {
    handleColor: null,
    handleOnColor: null,
    handleOffColor: null,
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

  setHandleColor(event: MouseEvent, color: string) {
    event.preventDefault();
    event.stopPropagation();
    this.model.handleColor = color;
  }

  setHandleOnColor(event: MouseEvent, color: string) {
    event.preventDefault();
    event.stopPropagation();
    this.model.handleOnColor = color;
  }

  setHandleOffColor(event: MouseEvent, color: string) {
    event.preventDefault();
    event.stopPropagation();
    this.model.handleOffColor = color;
  }
}
