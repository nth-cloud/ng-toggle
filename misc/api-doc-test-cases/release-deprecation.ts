import {Component, Directive, Injectable, Input, Output} from '@angular/core';

/**
 * Description
 *
 * @deprecated 2.0.0 description
 */
@Directive({
  selector: '[nthDirective]'
})
export class NthDirective {
  /**
   * Description
   *
   * @deprecated 2.0.0 description
   */
  @Input() input;

  /**
   * Description
   *
   * @deprecated 2.0.0 description
   */
  @Output() output;

  /**
   * Description
   *
   * @deprecated 2.0.0 description
   */
  property;

  /**
   * Description
   *
   * @deprecated 2.0.0 description
   */
  method() {}
}

/**
 * Description
 *
 * @deprecated 2.0.0 description
 */
@Component({
  selector: 'nth-component'
})
export class NthComponent {}


/**
 * Description
 *
 * @deprecated 2.0.0 description
 */
@Injectable()
export class NthService {}

/**
 * Description
 *
 * @deprecated 2.0.0 description
 */
export class NthClass {}

/**
 * Description
 *
 * @deprecated 2.0.0 description
 */
export interface NthInterface {
}
