import {Injectable} from '@angular/core';

/**
 * Service defining default values for progress bars
 */
@Injectable()
export class MyConfig {

  /**
   * Maximal value to be displayed in the progressbar.
   */
  max = 100;

  /**
   * Voluntarily left without a default value.
   */
  foo: string;

  private _dontExtract;

  /**
   * @internal
   */
  notForDocumentation;

  noDescriptionButStillExtract = 'sth';
}
