import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {NthdModule} from './app/app.module';
import {environment} from './environments/environment';

// depending on the env mode, enable prod mode or add debugging modules
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(NthdModule);
