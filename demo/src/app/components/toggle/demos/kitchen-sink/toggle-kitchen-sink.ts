import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { JsonPipe, NgFor, TitleCasePipe } from "@angular/common";
import { NgToggleModule } from "@nth-cloud/ng-toggle";

interface KitchenSinkModel {
  handleColor: string | null;
  handleOnColor: string | null;
  handleOffColor: string | null;
  onColor: string | null;
  offColor: string | null;
  onText: string | null;
  offText: string | null;
  disabled: boolean;
  size: 'sm' | 'lg' | '';
  value: boolean | null;
}

@Component({
  selector: 'nthd-toggle-kitchen-sink',
  standalone: true,
  imports: [ NgToggleModule, FormsModule, JsonPipe, NgFor, TitleCasePipe ],
  templateUrl: './toggle-kitchen-sink.html',
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
    value: null,
  };

  colors: any = [ 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark' ];

  public setOnColor(event: MouseEvent, color: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.model.onColor = color;
  }

  public setOffColor(event: MouseEvent, color: string | null): void {
    event.preventDefault();
    event.stopPropagation();
    this.model.offColor = color;
  }

  public setHandleColor(event: MouseEvent, color: string | null): void {
    event.preventDefault();
    event.stopPropagation();
    this.model.handleColor = color;
  }

  public setHandleOnColor(event: MouseEvent, color: string | null): void {
    event.preventDefault();
    event.stopPropagation();
    this.model.handleOnColor = color;
  }

  public setHandleOffColor(event: MouseEvent, color: string | null): void {
    event.preventDefault();
    event.stopPropagation();
    this.model.handleOffColor = color;
  }
}
