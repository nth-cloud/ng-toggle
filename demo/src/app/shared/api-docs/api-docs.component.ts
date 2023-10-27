import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NthdApiDocsBadge } from './api-docs-badge.component';
import { NgFor, NgIf } from '@angular/common';
import { NthdFragment } from '../fragment/fragment.directive';
import { ClassDesc, DirectiveDesc, InputDesc, MethodDesc, PropertyDesc, signature } from './api-docs.model';
import { AnalyticsService } from '../../services/analytics.service';
import apiDocs from '../../../api-docs';

/**
 * Displays the API docs of a directive.
 *
 * The default values of its inputs are looked for in the directive api doc itself, or in the matching property
 * of associated Config service, if any.
 *
 * The config service of a directive NthFoo is, by convention, named NthFooConfig.
 */
@Component({
	selector: 'nthd-api-docs',
	standalone: true,
	imports: [RouterLink, NthdApiDocsBadge, NgIf, NgFor, NthdFragment],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './api-docs.component.html',
	styles: [
		`
			.label-cell {
				width: 25%;
			}
			.content-cell {
				width: 75%;
			}
		`,
	],
})
export class NthdApiDocs {
	apiDocs: DirectiveDesc;
	configServiceName: string;

	@Input()
	set directive(directiveName: string) {
		this.apiDocs = apiDocs[directiveName];
		this.configServiceName = `${directiveName}Config`;
		const configApiDocs = apiDocs[this.configServiceName];
		this._configProperties = {};
		if (configApiDocs) {
			this.apiDocs.inputs.forEach(
				(input) => (this._configProperties[input.name] = this._findInputConfigProperty(configApiDocs, input)),
			);
		}
	}

	/**
	 * Object which contains, for each input name of the directive, the corresponding property of the associated config
	 * service (if any)
	 */
	private _configProperties: { [propertyName: string]: PropertyDesc };

	constructor(private _analytics: AnalyticsService) {}

	/**
	 * Returns the default value of the given directive input by first looking for it in the matching config service
	 * property. If there is no matching config property, it reads it from the input.
	 */
	defaultInputValue(input: InputDesc): string {
		const configProperty = this._configProperties[input.name];
		return (configProperty ? configProperty.defaultValue : input.defaultValue) || '';
	}

	/**
	 * Returns true if there is a config service property matching with the given directive input
	 */
	hasConfigProperty(input: InputDesc): boolean {
		return !!this._configProperties[input.name];
	}

	methodSignature(method: MethodDesc): string {
		return signature(method);
	}

	trackSourceClick() {
		this._analytics.trackEvent('Source File View', this.apiDocs.className);
	}

	private _findInputConfigProperty(configApiDocs: ClassDesc, input: InputDesc): PropertyDesc {
		return configApiDocs.properties.filter((prop) => prop.name === input.name)[0];
	}
}
