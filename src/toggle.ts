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
	ViewEncapsulation,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { NgToggleLabelDirective } from './toggle-label';

/**
 * The Toggle directive allows for standalone or checkbox-enabled switch toggling via a UI element.
 * The toggle is styled using Bootstrap v4+ classes.
 * Accessibility implemented according to
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role
 */
@Component({
	selector: 'ng-toggle',
	standalone: true,
	imports: [NgTemplateOutlet, NgIf],
	template: `
		<span #container class="ng-toggle-container" [style.margin-left]="marginLeft">
			<span
				#on
				class="ng-toggle-on btn btn-{{ onColor }}"
				[class.btn-lg]="largeButton"
				[class.btn-sm]="smallButton"
				[class.disabled]="disabled"
			>
				<ng-template [ngTemplateOutlet]="onLabel?.templateRef || null"></ng-template>
				<ng-container *ngIf="!onLabel">{{ onText }}</ng-container>
			</span>
			<span
				#handle
				class="ng-toggle-handle btn {{ handleButtonClass }}"
				[class.btn-lg]="largeButton"
				[class.btn-sm]="smallButton"
				[class.disabled]="disabled"
				>&nbsp;</span
			>
			<span
				#off
				class="ng-toggle-off btn btn-{{ offColor }}"
				[class.btn-lg]="largeButton"
				[class.btn-sm]="smallButton"
				[class.disabled]="disabled"
			>
				<ng-template [ngTemplateOutlet]="offLabel?.templateRef || null"></ng-template>
				<ng-container *ngIf="!offLabel">{{ offText }}</ng-container>
			</span>
		</span>
		<ng-content></ng-content>
	`,
	styleUrls: ['./toggle.scss'],
	preserveWhitespaces: false,
	encapsulation: ViewEncapsulation.None,
})
export class NgToggleComponent implements AfterViewInit, AfterContentInit, AfterViewChecked, OnChanges {
	/**
	 * Display text when toggled in the "On" position
	 */
	@Input() onText: string | null = 'On';
	/**
	 * Display text when toggled in the "Off" position
	 */
	@Input() offText: string | null = 'Off';
	/**
	 * Bootstrap color scheme when toggled in the "On" position (i.e. "primary" translates to "btn-primary")
	 */
	@Input() onColor: string | null = 'primary';
	/**
	 * Bootstrap color scheme when toggled in the "Off" position (i.e. "primary" translates to "btn-primary")
	 */
	@Input() offColor: string | null = 'secondary';
	/**
	 * Bootstrap color scheme for handle (i.e. "light" translated to "btn-light")
	 */
	@Input() handleColor: string | null = null;
	/**
	 * Bootstrap color scheme for handle when toggled in the "On" position (i.e. "light" translated to "btn-light")
	 */
	@Input() handleOnColor: string | null = null;
	/**
	 * Bootstrap color scheme for handle when toggled in the "Off" position (i.e. "light" translated to "btn-light")
	 */
	@Input() handleOffColor: string | null = null;
	/**
	 * Button size to display the toggle
	 */
	@Input() size: 'sm' | 'lg' | '' = '';
	/**
	 * Whether the toggle is disabled or not
	 */
	@Input() @HostBinding('class.disabled') @HostBinding('class.ng-toggle-disabled') disabled = false;

	/**
	 * An event fired when the user causes a change.
	 * The payload of the event is the currently selected value.
	 */
	@Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	@HostBinding('class.btn') btnClass = true;
	@Input('tabindex') @HostBinding('attr.tabindex') tabindex = 0;
	@Input('role') @HostBinding('attr.role') role = 'checkbox';

	width = 0;
	handleWidth = 0;

	@ViewChild('container', { static: true }) containerElement: ElementRef;
	@ViewChild('on', { static: true }) onElement: ElementRef;
	@ViewChild('off', { static: true }) offElement: ElementRef;
	@ViewChild('handle', { static: true }) handleElement: ElementRef;
	@ContentChildren(NgToggleLabelDirective) labelElements: QueryList<NgToggleLabelDirective>;
	onLabel: NgToggleLabelDirective | undefined;
	offLabel: NgToggleLabelDirective | undefined;

	private _animate = true;
	private _innerAnimate = true;
	private _innerState = false;
	private _innerWidth: string | number = 'auto';
	private _disableInitialAnimation = false;

	private _dragStart: any = null;
	private _dragEnd: any = null;
	private _initialized = false;
	private _hidden = false;

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

	constructor(private ngZone: NgZone, private element: ElementRef) {}

	ngAfterViewInit(): void {
		this.calculateWidth();
		this._initialized = true;
		this.ngZone.run(() => setTimeout(() => (this._disableInitialAnimation = false)));
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
		const onElement: NgToggleLabelDirective | undefined = this.labelElements.find(
			(item: NgToggleLabelDirective) => item.forLabel.toLowerCase() === 'on',
		);
		const offElement: NgToggleLabelDirective | undefined = this.labelElements.find(
			(item: NgToggleLabelDirective) => item.forLabel.toLowerCase() === 'off',
		);

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

	get handleButtonClass(): string {
		if (
			((null === this.handleOnColor && null === this.handleOffColor) || this.indeterminate) &&
			null !== this.handleColor
		) {
			return `btn-${this.handleColor}`;
		} else if (null === this.handleOnColor && null === this.handleOffColor) {
			return this.handleDark ? 'btn-dark' : 'btn-light';
		} else if (null !== this.handleOnColor && this.value) {
			return `btn-${this.handleOnColor}`;
		} else if (null !== this.handleOffColor && !this.value && !this.indeterminate) {
			return `btn-${this.handleOffColor}`;
		}

		return 'btn-light';
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
		return this.innerState;
	}

	@HostBinding('class.ng-toggled-off')
	get toggledOff(): boolean {
		return !this.innerState;
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
		return this._animate && (!this._disableInitialAnimation || (this._initialized && !this._disableInitialAnimation));
	}

	get marginLeft(): string {
		let margin = 0;
		/* eslint-disable no-empty */
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
			case 'Spacebar':
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
			const difference = (event.pageX || event.touches[0].pageX) - this._dragStart;
			if (difference < -Number(this.width) || difference > 0) {
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
				this.container$.style.width = this.width * 2 + this.handleWidth + 'px';
				this.element$.style.width = this.width + this.handleWidth + 'px';
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
