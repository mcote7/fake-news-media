import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input('isNavFixed$') isNavFixed$: Observable<boolean>;
  @Input('isSubNavFixed$') isSubNavFixed$: Observable<boolean>;

  isDropdownShown: boolean = false;

  constructor() {}

  ngOnInit() {
  }
}
