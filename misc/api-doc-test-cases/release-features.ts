import {Component, Directive, Injectable, Input, Output} from '@angular/core';

/**
 * Description
 *
 * @since 2.0.0
 */
@Directive({
  selector: '[nthDirective]'
})
export class NthDirective {
  /**
   * Description
   *
   * @since 2.0.0
   */
  @Input() input;

  /**
   * Description
   *
   * @since 2.0.0
   */
  @Output() output;

  /**
   * Description
   *
   * @since 2.0.0
   */
  property;

  /**
   * Description
   *
   * @since 2.0.0
   */
  method() {}
}

/**
 * Description
 *
 * @since 2.0.0
 */
@Component({
  selector: 'nth-component'
})
export class NthComponent {}


/**
 * Description
 *
 * @since 2.0.0
 */
@Injectable()
export class NthService {}

/**
 * Description
 *
 * @since 2.0.0
 */
export class NthClass {}

/**
 * Description
 *
 * @since 2.0.0
 */
export interface NthInterface {}
