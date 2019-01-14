import {Directive, forwardRef, OnDestroy} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NgToggle} from './toggle';

@Directive({
  selector: 'ng-toggle',
  host: {'(change)': 'onChange($event)', '(touch)': 'onTouched()'},
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgToggleAccessor), multi: true}]
})
export class NgToggleAccessor implements ControlValueAccessor, OnDestroy {
  private _onChange: (_: any) => void;
  private _onTouched: () => void;
  private _subscription: Subscription;

  constructor(private _host: NgToggle) {
    this._subscription = this._host.valueChange.subscribe(value => this.onChange(value));
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }
  }

  onChange(_: any) {
    if (this._onChange) {
      this._onChange(this._host.value);
    }
  }

  onTouched() {
    if (this._onTouched) {
      this._onTouched();
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._host.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    if (typeof obj === 'boolean' || obj === null) {
      this._host.value = obj;
    }
  }
}
