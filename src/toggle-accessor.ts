import { Directive, forwardRef, HostListener, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgToggleComponent } from './toggle';

@Directive({
	selector: 'ng-toggle',
  standalone: true,
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgToggleAccessorDirective), multi: true }],
})
export class NgToggleAccessorDirective implements ControlValueAccessor, OnDestroy {
	private _onChange: (_: any) => void;
	private _onTouched: () => void;
	private _subscription: Subscription | null;

	constructor(private _host: NgToggleComponent) {
		this._subscription = this._host.valueChange.subscribe((value) => this.onChange(value));
	}

	ngOnDestroy(): void {
		if (this._subscription) {
			this._subscription.unsubscribe();
			this._subscription = null;
		}
	}

	@HostListener('change', ['$event'])
	onChange(_: any) {
		if (this._onChange) {
			this._onChange(this._host.value);
		}
	}

	@HostListener('touch', ['$event'])
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
