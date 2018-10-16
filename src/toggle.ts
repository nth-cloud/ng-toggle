import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

/**
 * The NgxToggleLabel directive allows you to customize the label for the "On" and "Off" states,
 * allowing for more robust and complex displays.
 * This directive must be used in conjunction with a ng-template.
 */
@Directive({selector: 'ng-template[ngxToggleLabel]'})
export class NgxToggleLabel {
  /**
   * Determines which state the label will be used.
   */
  @Input() forLabel: 'on'|'off';

  constructor(public templateRef: TemplateRef<any>, private elRef: ElementRef) {}

  get element(): ElementRef {
    return this.elRef;
  }
}


/**
 * The NgxToggle directive allows for standalone or checkbox-enabled switch toggling via a UI element.
 * The toggle is styled using Bootstrap v4+ classes.
 */
@Component({
  selector: 'ngx-toggle',
  template: `
    <div #wrapper class="ngx-toggle-wrapper btn" [ngClass]="btnClasses">
        <div #container class="ngx-toggle-container"
             [style.margin-left]="marginLeft"
        >
            <span #on class="ngx-toggle-on btn" [ngClass]="onClasses">
                <ng-template [ngTemplateOutlet]="onLabel?.templateRef"></ng-template>
                <ng-container *ngIf="!onLabel">{{onText}}</ng-container>
            </span>
            <span #handle class="ngx-toggle-handle btn" [ngClass]="handleClass">&nbsp;</span>
            <span #off class="ngx-toggle-off btn" [ngClass]="offClasses">
                <ng-template [ngTemplateOutlet]="offLabel?.templateRef"></ng-template>
                <ng-container *ngIf="!offLabel">{{offText}}</ng-container>
            </span>
        </div>
        <ng-content></ng-content>
    </div>
`,
  styles: [
    ':host {position: relative; display: inline-block;}',
    `.ngx-toggle-container,.ngx-toggle-on,.ngx-toggle-off,.ngx-toggle-handle {
        display: -webkit-box!important;
        display: -webkit-flex!important;
        display: -ms-flexbox!important;
        display: flex!important;
      }`,
    `.ngx-toggle-wrapper {
      position: relative;
      display: block;
      direction: ltr; cursor: pointer; overflow: hidden; padding:0;
      text-align: left; z-index: 0; user-select: none; vertical-align: middle;
      transition: border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out;
      box-sizing: content-box;
    }`,
    '.ngx-toggle-wrapper.disabled,.ngx-toggle-wrapper.disabled .btn{cursor: default;}',
    '.ngx-toggle-wrapper input{position: absolute; z-index: -1; visibility: hidden; width: 1px; height: 1px;}',
    '.ngx-toggle-container{align-items: stretch!important; top: 0; border-radius: 0; transform: translateZ(0);}',
    '.ngx-toggle-wrapper.ngx-toggle-animate .ngx-toggle-container {transition: margin-left 0.5s;}',
    '.ngx-toggle-on,.ngx-toggle-off {align-items: center!important; text-align: center; z-index: 1; border-radius: 0;}',
    `.ngx-toggle-on,.ngx-toggle-off,.ngx-toggle-handle {
        box-sizing: border-box;
        cursor: pointer;
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
        align-self: stretch !important;
      }`
  ],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None
})
export class NgxToggle implements AfterViewInit, AfterContentInit, AfterViewChecked, OnChanges {
  /**
   * Display text when toggled in the "On" position
   * @type {string}
   */
  @Input() onText: string = 'On';
  /**
   * Display text when toggled in the "Off" position
   * @type {string}
   */
  @Input() offText: string = 'Off';
  /**
   * Bootstrap color scheme when toggled in the "On" position (i.e. "primary" translates to "btn-primary")
   * @type {string}
   */
  @Input() onColor: string = 'primary';
  /**
   * Bootstrap color scheme when toggled in the "Off" position (i.e. "primary" translates to "btn-primary")
   * @type {string}
   */
  @Input() offColor: string = 'secondary';
  /**
   * Button size to display the toggle
   * @type {string}
   */
  @Input() size: 'sm'|'lg'|'' = '';
  /**
   * Whether the toggle is disabled or not
   * @type {boolean}
   */
  @Input() disabled: boolean = false;

  /**
   * @param {boolean} value
   */
  @Input()
  set value(value: boolean) {
    this.setState(value);
  }
  get value(): boolean {
    return this._innerState;
  }

  /**
   * An event fired when the user causes a change.
   * The payload of the event is the currently selected value.
   * @type {EventEmitter<boolean>}
   */
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  width: number = 0;
  handleWidth: number = 0;

  @ViewChild('wrapper') wrapperElement: ElementRef;
  @ViewChild('container') containerElement: ElementRef;
  @ViewChild('on') onElement: ElementRef;
  @ViewChild('off') offElement: ElementRef;
  @ViewChild('handle') handleElement: ElementRef;
  @ContentChildren(NgxToggleLabel) labelElements: QueryList<NgxToggleLabel>;
  onLabel: NgxToggleLabel;
  offLabel: NgxToggleLabel;

  private _animate: boolean = true;
  private _innerAnimate: boolean = true;
  private _innerState: boolean = false;
  private _innerWidth: string|number = 'auto';

  private _dragStart: any = null;
  private _dragEnd: any = null;
  private _initialized: boolean = false;
  private _hidden: boolean = false;

  constructor(private ngZone: NgZone, private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.calculateWidth();
    this._initialized = true;
  }

  ngAfterViewChecked(): void {
    let hidden = this.elRef.nativeElement.offsetParent === null;
    if (this._initialized && this._hidden && !hidden) {
      this.calculateWidth();
    }
    this._hidden = hidden;
  }

  ngAfterContentInit(): void {
    let onElement: NgxToggleLabel =
        this.labelElements.find((item: NgxToggleLabel) => item.forLabel.toLowerCase() === 'on');
    let offElement: NgxToggleLabel =
        this.labelElements.find((item: NgxToggleLabel) => item.forLabel.toLowerCase() === 'off');

    if (onElement) {
      this.onLabel = onElement;
    }
    if (offElement) {
      this.offLabel = offElement;
    }
    if (onElement || offElement) {
      this.calculateWidth(true);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['onText'] || changes['offText'] || changes['size']) {
      this._initialized = false;
      this.calculateWidth(this._initialized);
      this._initialized = true;
    }
  }

  get btnClasses(): any {
    let btnClasses = {
      'disabled': this.disabled,
      'ngx-toggle-lg': this.size === 'lg',
      'ngx-toggle-sm': this.size === 'sm',
      'btn-lg': this.size === 'lg',
      'btn-sm': this.size === 'sm',
      'ngx-toggled-on': this.innerState === true,
      'ngx-toggled-off': this.innerState === false,
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
    let classes = {'disabled': this.disabled, 'btn-lg': this.size === 'lg', 'btn-sm': this.size === 'sm'};
    if ((this.value && this.onColor === 'light') || (!this.value && this.offColor === 'light')) {
      handleClass = 'btn-dark';
    }
    classes[handleClass] = true;

    return classes;
  }

  get onClasses(): any {
    let classes = {'disabled': this.disabled, 'btn-lg': this.size === 'lg', 'btn-sm': this.size === 'sm'};
    classes['btn-' + this.onColor] = true;

    return classes;
  }

  get offClasses(): any {
    let classes = {'disabled': this.disabled, 'btn-lg': this.size === 'lg', 'btn-sm': this.size === 'sm'};
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
    if (!this._initialized) {
    } else if (this.indeterminate || this._innerState === null || typeof this._innerState === 'undefined') {
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

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!event.key || this.disabled) {
      return;
    }
    switch (event.key) {
      case 'Left':
        event.preventDefault();
        event.stopImmediatePropagation();
        this.setState(false);
        break;
      case 'Right':
        event.preventDefault();
        event.stopImmediatePropagation();
        this.setState(true);
        break;
    }
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

  private calculateWidth(disableAnimation: boolean = false) {
    if (disableAnimation && this._innerAnimate) {
      this._animate = false;
    }

    let initialized = this._initialized;
    if (!initialized) {
      this.container$.style.width = 'auto';
      this.wrapper$.style.width = 'auto';
    }
    this.on$.style.width = 'auto';
    this.off$.style.width = 'auto';
    setTimeout(() => {
      let width = this._innerWidth;
      if (this._innerWidth === 'auto') {
        width = Math.max(this.on$.offsetWidth, this.off$.offsetWidth);
      }

      this.handleWidth = this.handle$.offsetWidth;
      this.width = Number(width);

      if (!initialized) {
        this.container$.style.width = ((this.width * 2) + this.handleWidth) + 'px';
        this.wrapper$.style.width = (this.width + this.handleWidth) + 'px';
      }

      this.ngZone.run(() => {
        this.on$.style.width = this.width + 'px';
        this.off$.style.width = this.width + 'px';
        setTimeout(() => {
          if (disableAnimation && this._innerAnimate) {
            this._animate = true;
          }
        });
      });
    });
  }

  private setState(value: boolean) {
    if (value !== this._innerState) {
      this._innerState = value;
      this.valueChange.emit(this._innerState);
    }
  }

  private get wrapper$(): HTMLElement {
    return this.wrapperElement.nativeElement;
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
