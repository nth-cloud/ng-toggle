import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {NgToggleLabel} from './toggle-label';

/**
 * The Toggle directive allows for standalone or checkbox-enabled switch toggling via a UI element.
 * The toggle is styled using Bootstrap v4+ classes.
 * Accessibility implemented according to
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role
 */
@Component({
  selector: 'ng-toggle',
  template: `
    <span #container class="ng-toggle-container" [style.marginLeft]="marginLeft">
      <span #on class="ng-toggle-on btn btn-{{onColor}}" [class.btn-lg]="largeButton"
            [class.btn-sm]="smallButton" [class.disabled]="disabled">
          <ng-template [ngTemplateOutlet]="onLabel?.templateRef"></ng-template>
          <ng-container *ngIf="!onLabel">{{onText}}</ng-container>
      </span>
      <span #handle class="ng-toggle-handle btn" [class.btn-lg]="largeButton"
            [class.btn-sm]="smallButton" [class.disabled]="disabled"
            [class.btn-light]="!handleDark" [class.btn-dark]="handleDark">&nbsp;</span>
      <span #off class="ng-toggle-off btn btn-{{offColor}}" [class.btn-lg]="largeButton"
            [class.btn-sm]="smallButton" [class.disabled]="disabled">
        <ng-template [ngTemplateOutlet]="offLabel?.templateRef"></ng-template>
        <ng-container *ngIf="!offLabel">{{offText}}</ng-container>
      </span>
    </span>
    <ng-content></ng-content>
    `,
  styleUrls: ['./toggle.scss'],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None
})
export class NgToggle implements AfterViewInit, AfterContentInit, AfterViewChecked, OnChanges {
  /**
   * Display text when toggled in the "On" position
   */
  @Input() onText: string = 'On';
  /**
   * Display text when toggled in the "Off" position
   */
  @Input() offText: string = 'Off';
  /**
   * Bootstrap color scheme when toggled in the "On" position (i.e. "primary" translates to "btn-primary")
   */
  @Input() onColor: string = 'primary';
  /**
   * Bootstrap color scheme when toggled in the "Off" position (i.e. "primary" translates to "btn-primary")
   */
  @Input() offColor: string = 'secondary';
  /**
   * Button size to display the toggle
   */
  @Input() size: 'sm'|'lg'|'' = '';
  /**
   * Whether the toggle is disabled or not
   */
  @Input() @HostBinding('class.disabled') @HostBinding('class.ng-toggle-disabled') disabled: boolean = false;
  /**
   * Optional. Enable/Disable the initial transition animation. May prevent unwanted animation display.
   */
  @Input('disableInitialAnimation')
  set outerAnimate(value: boolean) {
    this._disableInitialAnimation = value;
  }

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
   */
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('class.btn') btnClass: boolean = true;
  @Input('tabindex') @HostBinding('attr.tabindex') tabindex: number = 0;
  @Input('role') @HostBinding('attr.role') role = 'checkbox';

  width: number = 0;
  handleWidth: number = 0;

  @ViewChild('container', {static: true}) containerElement: ElementRef;
  @ViewChild('on', {static: true}) onElement: ElementRef;
  @ViewChild('off', {static: true}) offElement: ElementRef;
  @ViewChild('handle', {static: true}) handleElement: ElementRef;
  @ContentChildren(NgToggleLabel) labelElements: QueryList<NgToggleLabel>;
  onLabel: NgToggleLabel;
  offLabel: NgToggleLabel;

  private _animate: boolean = true;
  private _innerAnimate: boolean = true;
  private _innerState: boolean = false;
  private _innerWidth: string|number = 'auto';
  private _disableInitialAnimation: boolean = false;

  private _dragStart: any = null;
  private _dragEnd: any = null;
  private _initialized: boolean = false;
  private _hidden: boolean = false;

  constructor(private ngZone: NgZone, private element: ElementRef) {}

  ngAfterViewInit(): void {
    this.calculateWidth();
    this._initialized = true;
    this.ngZone.run(() => setTimeout(() => this._disableInitialAnimation = false));
  }

  ngAfterViewChecked(): void {
    const hidden = this.element.nativeElement.offsetParent === null;
    if ((!this._initialized || this.width === 0) && this._hidden !== hidden) {
      this._initialized = false;
      this.calculateWidth();
      this._initialized = true;
    }
    this._hidden = hidden;
  }

  ngAfterContentInit(): void {
    const onElement: NgToggleLabel =
        this.labelElements.find((item: NgToggleLabel) => item.forLabel.toLowerCase() === 'on');
    const offElement: NgToggleLabel =
        this.labelElements.find((item: NgToggleLabel) => item.forLabel.toLowerCase() === 'off');

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
    if ('onText' in changes || 'offText' in changes || 'size' in changes) {
      this._initialized = false;
      this.calculateWidth(this._initialized);
      this._initialized = true;
    }
  }

  @HostBinding('class.btn-lg')
  @HostBinding('class.ng-toggle-lg')
  get largeButton(): boolean {
    return this.size === 'lg';
  }

  @HostBinding('class.btn-sm')
  @HostBinding('class.ng-toggle-sm')
  get smallButton(): boolean {
    return this.size === 'sm';
  }

  get handleDark(): boolean {
    return (this.value && this.onColor === 'light') || (!this.value && this.offColor === 'light');
  }

  @HostBinding('class.ng-toggle-indeterminate')
  get indeterminate(): boolean {
    return this._innerState === null || typeof this._innerState === 'undefined';
  }

  @HostBinding('class.ng-toggled-on')
  get toggledOn(): boolean {
    return this.innerState === true;
  }

  @HostBinding('class.ng-toggled-off')
  get toggledOff(): boolean {
    return this.innerState === false;
  }

  get innerState(): boolean {
    return this._innerState;
  }

  @HostBinding('attr.aria-checked')
  get ariaCheckedValue(): string {
    if (this.indeterminate) {
      return 'mixed';
    }
    return this.value ? 'true' : 'false';
  }

  @HostBinding('class.ng-toggle-animate')
  get animate(): boolean {
    return this._animate && (!this._disableInitialAnimation || this._initialized && !this._disableInitialAnimation);
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

  @HostListener('window:resize')
  handleResize() {
    this._initialized = false;
    this.calculateWidth(true);
    this._initialized = true;
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
      case 'ArrowLeft':
        event.preventDefault();
        event.stopImmediatePropagation();
        this.setState(false);
        break;
      case 'Right':
      case 'ArrowRight':
        event.preventDefault();
        event.stopImmediatePropagation();
        this.setState(true);
        break;
      case ' ':
        event.preventDefault();
        event.stopImmediatePropagation();
        this.setState(!this.value);
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
      if (this._innerAnimate && !this._animate) {
        this._animate = true;
      }
    }
  }

  private calculateWidth(disableAnimation: boolean = false) {
    if (disableAnimation && this._innerAnimate) {
      this._animate = false;
    }

    const initialized = <boolean>this._initialized;
    if (!initialized) {
      this.container$.style.width = 'auto';
      this.element$.style.width = 'auto';
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
        this.element$.style.width = (this.width + this.handleWidth) + 'px';
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

  private get element$(): HTMLElement {
    return this.element.nativeElement;
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
