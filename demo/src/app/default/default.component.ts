import {Component} from '@angular/core';

@Component({
  selector: 'ngtsd-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent {
  public version: string = process.env.version;
}
