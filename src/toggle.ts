
import {
    AfterViewInit, Component, ElementRef, HostListener, Input, Output, ViewChild, EventEmitter,
    NgZone
} from '@angular/core';

@Component({selector: 'ngx-toggle', template: `
<div class="ngx-toggle-wrapper btn {{active ? activeClass : inactiveClass}}" [ngClass]="{
    'disabled': disabled,
    'ngx-toggle-lg btn-lg': size === 'lg',
    'ngx-toggle-sm btn-sm': size === 'sm',
    'ngx-toggle-on': innerState,
    'ngx-toggle-off': !innerState,
    'ngx-toggle-animate': animate,
    'ngx-toggle-disabled disabled': disabled
}" [style.width]="(handleWidth + labelWidth) + 'px'">
    <div #container class="ngx-toggle-container"
         [style.width]="((handleWidth * 2) + labelWidth) + 'px'"
         [style.margin-left]="labelMarginLeft"
    >
        <span #on [innerHTML]="onText" class="ngx-toggle-on btn {{onClasses}}"></span>
        <span #label class="ngx-toggle-label btn btn-light">&nbsp;</span>
        <span #off [innerHTML]="offText" class="ngx-toggle-off btn {{offClasses}}"></span>
    </div>
</div>
`,
    styles: [
        ':host {position: relative; display: inline-block;}',
        `.ngx-toggle-wrapper {
        position: relative; display: inline-block; direction: ltr; cursor: pointer; overflow: hidden; padding:0;
        text-align: left; z-index: 0; user-select: none; vertical-align: middle; border-radius: 0;
        transition: border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out;
        }`,
        '.ngx-toggle-wrapper.btn {min-width:59px;min-height: 34px;}.ngx-toggle-wrapper.btn-lg {min-width:79px;min-height: 45px;}' +
        '.ngx-toggle-wrapper.btn-sm {min-width:50px;min-height: 30px;}',
        '.ngx-toggle-container {display: inline-block; top: 0; border-radius: 0; transform: translateZ(0);}',
        '.ngx-toggle-wrapper.ngx-toggle-animate .ngx-toggle-container {transition: margin-left 0.5s;}',
        '.ngx-toggle-on,.ngx-toggle-off {text-align: center; z-index: 1;}',
        `.ngx-toggle-on,.ngx-toggle-off,.ngx-toggle-label {
            border-radius: 0;
            box-sizing: border-box;
            cursor: pointer;
            display: inline-block!important;
            height: 100%;
        }`,
        `.ngx-toggle-label {
            text-align: center;
            margin-top: -1px;
            margin-bottom: -1px;
            z-index: 100;
        }`
    ]
})
export class NgxToggle implements AfterViewInit {
    @Input() onText: string = 'On';
    @Input() offText: string = 'Off';
    @Input() onColor: string = 'primary';
    @Input() offColor: string = 'secondary';
    @Input() size: 'sm' | 'lg' | '' = '';
    @Input() active: boolean;
    @Input() disabled: boolean = false;

    handleWidth: number = 0;
    labelWidth: number = 0;

    @ViewChild('container') containerElement: ElementRef;
    @ViewChild('on') onElement: ElementRef;
    @ViewChild('off') offElement: ElementRef;
    @ViewChild('label') labelElement: ElementRef;

    private _animate: boolean = true;
    private _innerAnimate: boolean = true;
    private _innerState: boolean = false;
    private _innerHandleWidth: string | number = 'auto';
    private _innerLabelWidth: string | number = 'auto';

    private _dragStart: any = null;
    private _dragEnd: any = null;

    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    constructor(private ngZone: NgZone) {}

    ngAfterViewInit(): void {
        this.calculateWidth();
    }

    get indeterminate(): boolean {
        return this.active === null || typeof this.active === 'undefined';
    }

    get activeClass(): string {
        return 'btn-' + this.onColor;
    }

    get inactiveClass(): string {
        return 'btn-' + this.offColor;
    }

    get innerState(): boolean {
        return this._innerState;
    }

    get animate(): boolean {
        return this._animate;
    }

    get labelMarginLeft(): string {
        let width = -this.handleWidth;
        if (this.indeterminate || this._innerState === null || typeof this._innerState === 'undefined') {
            width = -(this.handleWidth * 2);
        } else if (this._dragEnd) {
            width = this._dragEnd;
        } else if (!this._innerState) {
            width = -this.handleWidth;
        }

        return width + 'px';
    }

    get onClasses(): string {
        return this.onColor ? 'btn-' + this.onColor : '';
    }

    get offClasses(): string {
        return this.offColor ? 'btn-' + this.offColor : '';
    }

    @HostListener('click', ['$event'])
    handleClick(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    @HostListener('touchstart', ['$event'])
    onTouchStart(event: any) {
        this.onDragStart(event);
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: any) {
        this.onDragStart(event);
    }

    @HostListener('touchmove', ['$event'])
    onTouchMove(event: any) {
        this.onDragMove(event);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: any) {
        this.onDragMove(event);
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: any) {
        this.onDragEnd(event, true);
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(event: any) {
        this.onDragEnd(event);
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave(event: any) {
        this.onDragEnd(event, true);
    }

    private onDragStart(event: any): void {
        if (event.target === this.label$) {
            if (this._dragStart || this.disabled) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            this._dragStart = (event.pageX || event.touchs[0].pageX) - parseInt(this.container$.style.marginLeft, 10);
            if (this._animate) {
                this._animate = !this._animate;
            }
        }
    }

    private onDragMove(event: any): void {
        if (this._dragStart) {
            event.preventDefault();
            let difference = (event.pageX || event.touches[0].pageX) - this._dragStart;
            if (difference < -(Number(this.handleWidth)) || difference > 0) {
                return;
            }
            this._dragEnd = difference;
        }
    }

    private onDragEnd(event: any, clearDragEnd: boolean = false): void {
        if (this._dragStart) {
            event.preventDefault();
            event.stopPropagation();
            if (this._dragEnd) {
                this.active = this._dragEnd > -(Number(this.handleWidth) / 2);
            }
            this._dragStart = null;
            if (clearDragEnd) {
                this._dragEnd = null;
            }
            if (this._innerAnimate) {
                this._animate = true;
            }
        }
    }

    private calculateWidth(disableAnumation: boolean = false) {
        if (disableAnumation && this._innerAnimate) {
            this._animate = false;
        }

        setTimeout(
            () => {
                this.on$.style.width = 'auto';
                this.off$.style.width = 'auto';
                this.label$.style.width = 'auto';
                let width = this._innerHandleWidth;
                if (this._innerHandleWidth === 'auto') {
                    width = Math.max(this.on$.offsetWidth, this.off$.offsetWidth);
                }

                if (this._innerLabelWidth === 'auto') {
                    if (this.label$.offsetWidth < width) {
                        this.labelWidth = Number(width);
                    } else {
                        this.labelWidth = this.label$.offsetWidth;
                    }
                } else {
                    this.labelWidth = Number(this._innerLabelWidth);
                }

                this.handleWidth = Number(width);

                this.ngZone.run(() => {
                    this.label$.style.width = this.labelWidth + 'px';
                    this.on$.style.width = this.handleWidth + 'px';
                    this.off$.style.width = this.handleWidth + 'px';
                    setTimeout(() => {
                        if (disableAnumation && this._innerAnimate) {
                            this._animate = true;
                        }
                    });
                });
            }
        );
    }

    private get on$(): HTMLElement {
        return this.onElement.nativeElement;
    }

    private get off$(): HTMLElement {
        return this.offElement.nativeElement;
    }

    private get label$(): HTMLElement {
        return this.labelElement.nativeElement;
    }

    private get container$(): HTMLElement {
        return this.containerElement.nativeElement;
    }
}
