import {Directive, ElementRef, Input, TemplateRef} from '@angular/core';

/**
 * The ToggleLabel directive allows you to customize the label for the "On" and "Off" states,
 * allowing for more robust and complex displays.
 * This directive must be used in conjunction with a ng-template.
 */
@Directive({selector: 'ng-template[ngToggleLabel]'})
export class NgToggleLabel {
  /**
   * Determines which state the label will be used.
   */
  @Input() forLabel: 'on'|'off';

  constructor(public templateRef: TemplateRef<any>, private elRef: ElementRef) {}

  get element(): ElementRef {
    return this.elRef;
  }
}
