import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { NgToggleModule } from "@nth-cloud/ng-toggle";

import { NthdOverviewSectionComponent } from "../../../shared/overview/overview-section.component";
import { NthdCodeComponent } from "../../../shared/code/code.component";
import { NthdApiDocsBadge } from "../../../shared/api-docs";
import { Snippet } from "../../../services/snippet";
import { NthdOverview } from "../../../shared/overview/overview";
import { NthdDemoListService } from "../../../services/demo-list.service";

@Component({
  selector: 'nthd-toggle-overview',
  standalone: true,
  imports: [
    NgbAlertModule,
    NgToggleModule,
    NthdOverviewSectionComponent,
    NthdCodeComponent,
    RouterLink,
    NthdApiDocsBadge,
  ],
  templateUrl: './toggle-overview.component.html',
  host: { '[class.overview]': 'true' }
})
export class NthdToggleOverviewComponent {
  BASIC = Snippet({
    lang: 'html',
    code: `
    <ng-toggle
      onColor="primary"
      onText="On"
      offColor="secondary"
      offText="Off"
      [disabled]="false"
      size="lg"
    ></ng-toggle>
`
  });

  sections: NthdOverview = {};

  constructor(demoList: NthdDemoListService) {
    this.sections = demoList.getOverviewSections('toggle');
  }
}
