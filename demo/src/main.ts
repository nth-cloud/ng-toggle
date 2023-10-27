import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient, withNoXsrfProtection } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { ROUTES } from './app/routes';

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(ROUTES, withPreloading(PreloadAllModules)),
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy,
		},
		provideHttpClient(withNoXsrfProtection()),
	],
}).catch((err) => console.error(err));
