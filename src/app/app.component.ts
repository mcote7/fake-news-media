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
  public progress$: Observable<any>;
  public isNavFixed$: Observable<boolean>;
  public subNavTar: HTMLElement;
  public isSubNavFixed$: Observable<boolean>;
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
      this.subNavTar = document.getElementById('sub-nav-tar');
      let subTar = document.documentElement.scrollTop + 68;  // 68 = height of top-nav;
      const sub = this.subNavTar.offsetHeight;
      if(percent > 2) {
        this.isNavFixed$ = of(true);
      } else {
        this.isNavFixed$ = of(false);
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
}
