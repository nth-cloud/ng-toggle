import { chain, Rule } from '@angular-devkit/schematics';

import { Schema } from './schema';
import { addBootstrapStyles } from './steps/add-bootstrap';
import { addNgToggleModuleToAppModule } from './steps/add-ng-toggle-module';

/**
 * Sets up a project with all required to run ng-toggle.
 * This is run after 'package.json' was patched and all dependencies installed
 */
export default function ngAddSetupProject(options: Schema): Rule {
	return chain([addNgToggleModuleToAppModule(options), addBootstrapStyles(options)]);
}
