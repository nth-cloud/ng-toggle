import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';

export const componentsList = [
    {
      name: 'Toggle Switch',
      route: 'toggle'
    }
];

@Component({
  selector: 'ngbd-side-nav',
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {
  @Input() activeTab: String;
  components = componentsList;

  constructor(private router: Router) {}

  isActive(currentRoute: any[]): boolean {
    return this.router.isActive(this.router.createUrlTree(currentRoute), true);
  }
}
