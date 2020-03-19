import {Component} from '@angular/core';
import {environment} from '../../environments/environment';

const prism = require('prismjs');
const types = (Prism: any) => {
    require('prismjs/components/prism-clike');
    require('prismjs/components/prism-typescript');
};
types(prism);

@Component({
    selector: 'nthd-default',
    templateUrl: './default.component.html'
})
export class DefaultComponent {
    public version: string = environment.version;

    readonly installNPM: string = prism.highlight(require('!!raw-loader!./install-npm.md').default, prism.languages.clike, 'md');
    readonly bundle: string = prism.highlight(require('!!raw-loader!./bundle.md').default, prism.languages.javascript, 'js');
    readonly importUsage: string = prism.highlight(require('!!raw-loader!./import.md').default, prism.languages.typescript, 'ts');
    readonly usage: string = prism.highlight(require('!!raw-loader!./usage.md').default, prism.languages.typescript, 'ts');
}
