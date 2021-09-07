import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss']
})
export class SubNavComponent implements OnInit {

  @Input('isSubNavFixed$') isSubNavFixed$: Observable<boolean>;
  @Input('topic') topic: string;

  public subNav: HTMLElement;
  public intervalA: any;
  public intervalB: any;

  constructor() { }

  ngOnInit() {
    this.subNav = document.getElementById('scroll-x-el');
    // console.log('sub nav?', this.subNav)
  }

  // GET SCROLL EL > CLICK LEFT = 
  scrollLeft() {
    this.intervalB = setInterval(() => {
      this.subNav.scrollLeft -= 10;
      console.log('scroll left', this.subNav.scrollLeft)
    }, 10);
  }

  scrollLeftClear() {
    clearInterval(this.intervalB);
    console.log('scroll left clear' ,this.subNav.scrollLeft)
  }

  scrollRight() {
    this.intervalA = setInterval(() => {
      this.subNav.scrollLeft += 10;
      console.log('scroll right', this.subNav.scrollLeft)
    }, 10);
  }

  scrollRightClear() {
    clearInterval(this.intervalA);
    console.log('scroll right clear' ,this.subNav.scrollLeft)
  }
}
