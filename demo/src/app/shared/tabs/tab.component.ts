import {AfterContentInit, ContentChild, Directive, Input, Optional, TemplateRef} from "@angular/core";

let nextId = 0;

@Directive({selector: '[nthd-tab]'})
export class NthdTab {
  @Input() id: string = `nthd-tab-${nextId++}`;
  @Input() title: string | TemplateRef<any>;
  @Input() active: boolean = false;

  constructor(@Optional() public templateRef: TemplateRef<any>) {}
}

@Directive({selector: '[nthd-tab-title]'})
export class NthdTabTitle {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({selector: '[nthd-tab-content]'})
export class NthdTabContent {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: 'nthd-tab',
  providers: [ {provide: NthdTab, useExisting: NthdTabVerbose} ]
})
export class NthdTabVerbose extends NthdTab implements AfterContentInit {
  @Input() id: string = `nthd-tab-${nextId++}`;
  @Input() title: string | TemplateRef<any>;
  @Input() active: boolean = false;

  @ContentChild(NthdTabTitle) titleTemplate: NthdTabTitle;
  @ContentChild(NthdTabContent) contentTemplate: NthdTabContent;

  ngAfterContentInit(): void {
    if (this.titleTemplate) {
      this.title = this.titleTemplate.templateRef;
    }
    this.templateRef = this.contentTemplate.templateRef;
  }
}
