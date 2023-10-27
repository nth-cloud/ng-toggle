import { NgModule } from '@angular/core';

import { NgToggleComponent } from './toggle';
import { NgToggleAccessorDirective } from './toggle-accessor';
import { NgToggleLabelDirective } from './toggle-label';

export { NgToggleComponent } from './toggle';
export { NgToggleAccessorDirective } from './toggle-accessor';
export { NgToggleLabelDirective } from './toggle-label';

const DIRECTIVES = [NgToggleComponent, NgToggleAccessorDirective, NgToggleLabelDirective];

@NgModule({ imports: DIRECTIVES, exports: DIRECTIVES })
export class NgToggleModule {}
