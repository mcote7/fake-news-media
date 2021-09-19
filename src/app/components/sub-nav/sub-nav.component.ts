import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss']
})
export class SubNavComponent implements OnInit, OnDestroy {

  @Input('isSubNavFixed$') isSubNavFixed$: Observable<boolean>;
  @Input('topic') topic: string;


  public topics: any[] = [
    {
      name: "technology",
      displayName: "Technology",
      icon: "biotech"
    },
    {
      name: "science",
      displayName: "Science",
      icon: "science"
    },
    {
      name: "business",
      displayName: "Business",
      icon: "domain"
    },
    {
      name: "general",
      displayName: "General",
      icon: "travel_explore"
    },
    {
      name: "health",
      displayName: "Health",
      icon: "spa"
    },
    {
      name: "sports",
      displayName: "Sports",
      icon: "sports_cricket"
    },
    {
      name: "entertainment",
      displayName: "Entertainment",
      icon: "sports_esports"
    },
  ];

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

  ngOnDestroy() {
    clearInterval(this.intervalA);
    clearInterval(this.intervalB);
  }

  // MATERIAL DRAG & DROP 
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.topics, event.previousIndex, event.currentIndex);
  }

  prevDef(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }
}
