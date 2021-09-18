import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable, of } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';

// got test
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public scroll$ = fromEvent(document, 'scroll');
  public subNavTar: HTMLElement;
  public loadTopicTar: HTMLElement;
  public progress$: Observable<any>;
  public isNavFixed$: Observable<boolean>;
  public isSubNavFixed$: Observable<boolean>;
  public canLoadTopics: boolean;
  public topic: string;
  
  constructor(private router: ActivatedRoute) {
    this.router.queryParamMap.subscribe(params => {
      if(params.get('topic') !== null) {
        this.topic = params.get('topic');
        console.log("YES topic?", this.topic)
      } else {
        this.topic = 'technology';
        console.log("NO topic?", this.topic)
      }
      // console.log("?topic?", this.topic)
    });
  }
  
  ngOnInit() {
    document.title = "📰 Fake News Media";
    this.progress$ = this.scroll$.pipe(
      throttleTime(10),
      map(({ target }: any) => this.calculateScrollPercent(target.scrollingElement)),
      // tap(console.log) 
    );
    this.progress$.subscribe(percent => {
      this.loadTopicTar = document.getElementById('sub-nav');
      this.subNavTar = document.getElementById('sub-nav-tar');
      let subTar = document.documentElement.scrollTop + 68;  // 68 = height of top-nav;
      const sub = this.subNavTar.offsetHeight;
      if(percent > 1) {
        this.isNavFixed$ = of(true);
      } else {
        this.isNavFixed$ = of(false);
      }
      if(this.isInViewport(this.loadTopicTar)) {
        this.canLoadTopics = true;
        console.log("sub in view !!!!!", this.isInViewport(this.loadTopicTar))
      }
      if(subTar > sub) {
        this.isSubNavFixed$ = of(true);
      } else {
        this.isSubNavFixed$ = of(false);
      }
    });
  }

  calculateScrollPercent(element: HTMLElement) {
    const { scrollTop, scrollHeight, clientHeight } = element;
    // console.log("el", element)
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }

  isInViewport(elem: HTMLElement): boolean {
    let bounding = elem.getBoundingClientRect();
    console.log("b?", bounding)
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
