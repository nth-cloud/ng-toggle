import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NthdPageHeaderComponent } from "../../shared/page-wrapper/page-header.component";
import { NthdPageWrapper } from "../../shared/page-wrapper/page-wrapper.component";
import { NthdFragment } from "../../shared/fragment/fragment.directive";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'nthd-support',
  standalone: true,
  imports: [ NthdPageHeaderComponent, NthdPageWrapper, NthdFragment, RouterLink ],
  templateUrl: './support.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportComponent {
}
