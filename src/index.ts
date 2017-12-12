
import {ModuleWithProviders, NgModule} from '@angular/core';

@NgModule({imports : [], exports : []})
export class NgToggleSwitchRootModule {
}

@NgModule({imports : [], exports : []})
export class NgToggleSwitchModule {
  static forRoot(): ModuleWithProviders {
    return {ngModule : NgToggleSwitchRootModule};
  }
}
