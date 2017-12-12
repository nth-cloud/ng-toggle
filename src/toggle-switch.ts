
import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';

@Component({selector: 'ngx-toggle', template: `
<div class="btn" [ngClass]="{
    'disabled': disabled,
    'btn-lg': size === 'lg',
    'btn-sm': size === 'sm',
    activeClass: active,
    inactiveClass: !active
}">
    <div class="toggle-group">
        <label class="btn" *ngIf="active" [ngClass]="{}">{{onText}}</label>
        <label class="btn" *ngIf="!active">{{offText}}</label>
        <span class="toggle-handle btn btn-default"></span>
    </div>
</div>
`})
export class NgToggleSwitch {
    @Input() onText: string = 'On';
    @Input() offText: string = 'Off';
    @Input() onClasses: string = 'primary';
    @Input() offClasses: string = 'secondary';
    @Input() size: 'sm' | 'lg' | '' = '';
    @Input() active: boolean = false;
    @Input() disabled: boolean = false;

    @ViewChild('on') onElement: ElementRef;
    @ViewChild('off') offElement: ElementRef;
    @ViewChild('label') label: ElementRef;

    get activeClass(): string {
        return 'btn-' + this.onClasses;
    }

    get inactiveClass(): string {
        return 'btn-' + this.offClasses;
    }

    @HostListener('click', ['$event'])
    handleClick(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
    }
}
