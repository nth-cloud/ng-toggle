import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NthdFragment } from "../fragment/fragment.directive";
import { NthdOverviewSection } from "./overview";

@Component({
  selector: 'nthd-overview-section',
  standalone: true,
  imports: [RouterLink, NthdFragment],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-block'
  },
  template: `
    <h2>
      <a class="title-fragment" routerLink="." [fragment]="section.fragment" nthdFragment>
        <i class="bi bi-link-45deg" style="font-size: 1.75rem; color: black"></i>
      </a>
      {{ section.title }}
    </h2>

    <ng-content></ng-content>
  `
})
export class NthdOverviewSectionComponent {
  @Input() section: NthdOverviewSection;
}
