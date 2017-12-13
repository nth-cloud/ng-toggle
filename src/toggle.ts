
import {
    AfterViewInit, Component, ElementRef, HostListener, Input, Output, ViewChild, EventEmitter,
    NgZone, OnChanges, SimpleChanges
} from '@angular/core';

@Component({selector: 'ngx-toggle', template: `
    <div class="ngx-toggle-wrapper btn" [ngClass]="btnClasses" [style.width]="(width + handleWidth) + 'px'">
        <div #container class="ngx-toggle-container"
             [style.width]="((width * 2) + handleWidth) + 'px'"
             [style.margin-left]="marginLeft"
        >
            <span #on [innerHTML]="onText" class="ngx-toggle-on btn" [ngClass]="onClasses"></span>
            <span #handle class="ngx-toggle-handle btn" [ngClass]="handleClass">&nbsp;</span>
            <span #off [innerHTML]="offText" class="ngx-toggle-off btn" [ngClass]="offClasses"></span>
        </div>
        <ng-content></ng-content>
    </div>
`,
    styles: [
        ':host {position: relative; display: inline-block;}',
        `.ngx-toggle-wrapper {
        position: relative; display: inline-block; direction: ltr; cursor: pointer; overflow: hidden; padding:0;
        text-align: left; z-index: 0; user-select: none; vertical-align: middle;
        transition: border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out; box-sizing: content-box;
        }.ngx-toggle-wrapper.disabled,.ngx-toggle-wrapper.disabled .btn{cursor: default;}`,
        '.ngx-toggle-wrapper input{z-index: -1; visibility: hidden;}',
        '.ngx-toggle-container {display: inline-block; top: 0; border-radius: 0; transform: translateZ(0);}',
        '.ngx-toggle-wrapper.ngx-toggle-animate .ngx-toggle-container {transition: margin-left 0.5s;}',
        '.ngx-toggle-on,.ngx-toggle-off {text-align: center; z-index: 1; border-radius: 0;}',
        `.ngx-toggle-on,.ngx-toggle-off,.ngx-toggle-handle {
            box-sizing: border-box;
            cursor: pointer;
            display: inline-block!important;
            height: 100%;
            user-select: none;
        }`,
        `.ngx-toggle-handle {
            text-align: center;
            margin-top: -1px;
            margin-bottom: -1px;
            z-index: 100;
            width: 1em;
            padding-left: 0;
            padding-right: 0;
        }`
    ],
    preserveWhitespaces: false
})
export class NgxToggle implements AfterViewInit, OnChanges {
    @Input() onText: string = 'On';
    @Input() offText: string = 'Off';
    @Input() onColor: string = 'primary';
    @Input() offColor: string = 'secondary';
    @Input() size: 'sm' | 'lg' | '' = '';
    @Input() disabled: boolean = false;

    @Input() set value(value: boolean) {
        this.setState(value);
    }
    get value(): boolean {
        return this._innerState;
    }

    @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    width: number = 0;
    handleWidth: number = 0;

    @ViewChild('container') containerElement: ElementRef;
    @ViewChild('on') onElement: ElementRef;
    @ViewChild('off') offElement: ElementRef;
    @ViewChild('handle') handleElement: ElementRef;

    private _animate: boolean = true;
    private _innerAnimate: boolean = true;
    private _innerState: boolean = false;
    private _innerWidth: string | number = 'auto';

    private _dragStart: any = null;
    private _dragEnd: any = null;
    private _initialized: boolean = false;

    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    constructor(private ngZone: NgZone) {}

    ngAfterViewInit(): void {
        this.calculateWidth();
        this._initialized = true;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['onText'] ||
            changes['offText'] ||
            changes['size']
        ) {
            this.calculateWidth(this._initialized);
        }
    }

    get btnClasses(): any {
        let btnClasses = {
            'disabled': this.disabled,
            'ngx-toggle-lg': this.size === 'lg',
            'ngx-toggle-sm': this.size === 'sm',
            'btn-lg': this.size === 'lg',
            'btn-sm': this.size === 'sm',
            'ngx-toggled-on': this.innerState,
            'ngx-toggled-off': !this.innerState,
            'ngx-toggle-indeterminate': this.indeterminate,
            'ngx-toggle-animate': this.animate,
            'ngx-toggle-disabled': this.disabled
        };
        btnClasses[this.activeClass] = this.value;
        btnClasses[this.inactiveClass] = !this.value;
        if (this.activeClass === this.inactiveClass) {
            btnClasses[this.activeClass] = true;
        }

        return btnClasses;
    }

    get handleClass(): any {
        let handleClass = 'btn-light';
        let classes = {'disabled': this.disabled,'btn-lg': this.size === 'lg','btn-sm': this.size === 'sm'};
        if ((this.value && this.onColor === 'light') ||
            (!this.value && this.offColor === 'light')
        ) {
            handleClass = 'btn-dark';
        }
        classes[handleClass] = true;

        return classes;
    }

    get onClasses(): any {
        let classes = {'disabled': this.disabled,'btn-lg': this.size === 'lg','btn-sm': this.size === 'sm'};
        classes['btn-' + this.onColor] = true;

        return classes;
    }

    get offClasses(): any {
        let classes = {'disabled': this.disabled,'btn-lg': this.size === 'lg','btn-sm': this.size === 'sm'};
        classes['btn-' + this.offColor] = true;

        return classes;
    }

    get indeterminate(): boolean {
        return this._innerState === null || typeof this._innerState === 'undefined';
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

    get marginLeft(): string {
        let margin = 0;
        if (this.indeterminate || this._innerState === null || typeof this._innerState === 'undefined') {
            margin = -(this.width / 2);
        } else if (this._dragEnd) {
            margin = this._dragEnd;
        } else if (!this._innerState) {
            margin = -this.width;
        }

        return margin + 'px';
    }

    @HostListener('click')
    handleClick() {
        if (!this.disabled && !this._dragEnd) {
            this.setState(!this._innerState);
        } else if (this._dragEnd) {
            this._dragEnd = null;
        }
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
        if (event.target === this.handle$) {
            if (this._dragStart || this.disabled) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            this._dragStart = (event.pageX || event.touches[0].pageX) - parseInt(this.container$.style.marginLeft, 10);
            if (this._animate) {
                this._animate = !this._animate;
            }
        }
    }

    private onDragMove(event: any): void {
        if (this._dragStart) {
            event.preventDefault();
            let difference = (event.pageX || event.touches[0].pageX) - this._dragStart;
            if (difference < -(Number(this.width)) || difference > 0) {
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
                this.setState(this._dragEnd > -(Number(this.width) / 2));
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

                let width = this._innerWidth;
                if (this._innerWidth === 'auto') {
                    width = Math.max(this.on$.offsetWidth, this.off$.offsetWidth);
                }

                this.handleWidth = this.handle$.offsetWidth;
                this.width = Number(width);

                this.ngZone.run(() => {
                    this.on$.style.width = this.width + 'px';
                    this.off$.style.width = this.width + 'px';
                    setTimeout(() => {
                        if (disableAnumation && this._innerAnimate) {
                            this._animate = true;
                        }
                    });
                });
            }
        );
    }

    private setState(value: boolean) {
        if (value !== this._innerState) {
            this._innerState = value;
            this.valueChange.emit(this._innerState);
        }
    }

    private get on$(): HTMLElement {
        return this.onElement.nativeElement;
    }

    private get off$(): HTMLElement {
        return this.offElement.nativeElement;
    }

    private get handle$(): HTMLElement {
        return this.handleElement.nativeElement;
    }

    private get container$(): HTMLElement {
        return this.containerElement.nativeElement;
    }
}
