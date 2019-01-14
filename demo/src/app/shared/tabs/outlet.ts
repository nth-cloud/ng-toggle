import {Component, Input, OnChanges, TemplateRef} from "@angular/core";

@Component({
  selector: '[nthdInternalOutlet]',
  template: `{{content}}<ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>`,
})
export class NthdInternalOutlet implements OnChanges {
  @Input() nthdInternalOutlet: string | TemplateRef<any>;

  content: string;
  contentTemplate: TemplateRef<any>;

  ngOnChanges(changes?: any) {
    [this.content, this.contentTemplate] = this.nthdInternalOutlet instanceof TemplateRef
      ? ['', <TemplateRef<any>>this.nthdInternalOutlet]
      : [<string>this.nthdInternalOutlet, null];
  }
}
