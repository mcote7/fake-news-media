import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss']
})
export class SubNavComponent implements OnInit {

  @Input('isSubNavFixed$') isSubNavFixed$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
  }
}
