import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'km-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'knowledge-management';
  constructor(public shareService: SharedService) {

  }
}
