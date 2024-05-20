import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgToggleModule } from '@nth-cloud/ng-toggle';

import { NthdPageHeaderComponent } from '../../shared/page-wrapper/page-header.component';
import { NthdCodeComponent } from '../../shared/code/code.component';
import { NthdPageWrapper } from '../../shared/page-wrapper/page-wrapper.component';
import { versions } from '../../../environments/versions';
import { Snippet } from '../../services/snippet';

@Component({
	standalone: true,
	imports: [NthdPageHeaderComponent, NthdCodeComponent, NgToggleModule, NgIf, NthdPageWrapper, NgbCollapseModule],
	templateUrl: './getting-started.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedPage {
	instructionsCollapsed: boolean = true;
	olderVersionsCollapsed: boolean = true;
	bsVersion: string = versions.bootstrap;

	schematics = Snippet({
		lang: 'bash',
		code: `ng add @nth-cloud/ng-toggle`,
	});

	schematicsProject = Snippet({
		lang: 'bash',
		code: `ng add @nth-cloud/ng-toggle --project myProject`,
	});

	bootstrapScss = Snippet({
		lang: 'css',
		code: `
      @import "bootstrap/scss/bootstrap";
      /*
      or import only the bootstrap scss files that your application actually needs,
      as described in the Bootstrap customization guide:
      https://getbootstrap.com/docs/5.2/customize/sass/#importing
      */
		`,
	});

	bootstrapCssAngularJson = Snippet({
		lang: 'typescript',
		code: `
      "yourApp": {
        "architect": {
          "build": {
            "options": {
              "styles": [
                "node_modules/bootstrap/dist/css/bootstrap.min.css"
              ]
            }
          }
        }
      }
    `,
	});

	bootstrapInstall = Snippet({
		lang: 'bash',
		code: `npm install bootstrap`,
	});

	codeInstall = Snippet({
		lang: 'bash',
		code: `npm install @nth-cloud/ng-toggle`,
	});

	codeRoot = Snippet({
		lang: 'typescript',
		code: `
      import { NgToggleModule } from '@nth-cloud/ng-toggle';

      @NgModule({
        imports: [NgToggleModule],
      })
      export class YourAppModule {
      }
    `,
	});

	codeOther = Snippet({
		lang: 'typescript',
		code: `
      import { NgToggleModule } from '@nth-cloud/ng-toggle';

      @NgModule({
        imports: [NgToggleModule],
      })
      export class YourAppModule {
      }
    `,
	});

	codeStandalone = Snippet({
		lang: 'typescript',
		code: `
      import { NgToggleComponent } from '@nth-cloud/ng-toggle';

      @Component({
        selector: 'app-product',
        standalone: true,
        imports: [NgToggleComponent],
        templateUrl: './product.component.html'
      })
      export class ProductComponent {
      }
    `,
	});
}
