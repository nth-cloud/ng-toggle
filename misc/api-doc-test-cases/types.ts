import { Component, Directive, Injectable } from '@angular/core';

/**
 * Should be 'Directive'
 */
@Directive({
  selector: '[nthDirective]'
})
export class NthDirective {}

/**
 * Should be 'Component'
 */
@Component({
  selector: 'nth-component'
})
export class NthComponent {}


/**
 * Should be 'Service'
 */
@Injectable()
export class NthService {}

/**
 * Should be 'Class'
 */
export class NthClass {}

/**
 * Should be 'Interface'
 */
export interface NthInterface {}
