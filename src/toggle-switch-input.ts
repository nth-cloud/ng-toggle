import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

const NG_TOGGLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgToggleSwitchInput)
};

const NG_TOGGLE_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NgToggleSwitchInput),
    multi: true
};

@Directive({
    selector: 'input[ngxToggle]',
    exportAs: 'ngxToggle',
    providers: [NG_TOGGLE_VALUE_ACCESSOR, NG_TOGGLE_VALIDATOR]
})
export class NgToggleSwitchInput {
}
