import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList} from '@angular/core';
import {NthdTab} from './tab.component';

export class NthdTabEvent {
  constructor(public readonly activeId: any, public readonly nextId: any) {}

  preventDefault() {}
}

@Component({
  selector: 'nthd-tabset',
  exportAs: 'nthdTabSet',
  templateUrl: './tabs.component.html'
})
export class NthdTabs implements AfterContentInit {
  @Input() activeId: string;
  @Output() tabChange: EventEmitter<NthdTabEvent> = new EventEmitter<NthdTabEvent>();

  @ContentChildren(NthdTab) tabs: QueryList<NthdTab>;

  activeTab: NthdTab;

  ngAfterContentInit(): void {
    this.activate();

    if (!this.activeTab && this.tabs.length > 0) {
      this.onSelect(this.tabs.first);
    }
  }

  onSelect(tab: NthdTab, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    const tabEvent = new NthdTabEvent(this.activeId, tab.id);
    this.activeId = tab.id;
    this.activate();
    this.tabChange.emit(tabEvent);
  }

  private activate() {
    if (this.activeTab) {
      this.activeTab.active = false;
    }
    this.activeTab = this.findActiveTab();
    if (this.activeTab) {
      this.activeTab.active = true;
    }
  }

  private findActiveTab() {
    return this.tabs.toArray().find((t: NthdTab) => t.id && t.id === this.activeId);
  }
}
