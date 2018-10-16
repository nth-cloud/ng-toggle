import {Component} from '@angular/core';

@Component({
  selector: 'ngxd-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent {
  public version: string = process.env.version;
}
