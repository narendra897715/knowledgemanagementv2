import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'km-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent implements OnInit {
  @HostBinding('attr.class') role = 'vbox viewport';

  constructor() { }

  ngOnInit() {
  }

}
