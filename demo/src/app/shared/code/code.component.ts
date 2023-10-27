import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { CodeHighlightService } from '../../services/code-highlight.service';
import {ISnippet} from "../../services/snippet";

@Component({
	selector: 'nthd-code',
  standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <pre class="language-{{ snippet.lang }}"><code #code class="language-{{ snippet.lang }}"></code></pre> `,
})
export class NthdCodeComponent implements AfterViewInit {
	@ViewChild('code', { static: true }) codeEl: ElementRef;

  @Input() snippet: ISnippet;

	constructor(private _service: CodeHighlightService) {}

	ngAfterViewInit() {
		this.codeEl.nativeElement.innerHTML = this._service.highlight(this.snippet.code, this.snippet.lang);
	}
}
