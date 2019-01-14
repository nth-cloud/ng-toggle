import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'prism',
    template: '<pre class="language-{{language}}"><code ngNonBindable [innerHTML]="html" class="language-{{language}}"></code></pre>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismComponent {
    @Input() language: string = 'bash';
    @Input() html: string;
}
