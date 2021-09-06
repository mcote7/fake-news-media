import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { map, tap, throttleTime } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public scroll$ = fromEvent(document, 'scroll');
  public progress$: Observable<any>;
  public isNavFixed$: Observable<boolean>;
  
  constructor() {}
  
  ngOnInit() {
    window.onload = () => {
      setTimeout (() => {
        scrollTo(0,0);
      }, 100);
    }
    document.title = "📰 Fake News Media";
    this.progress$ = this.scroll$.pipe(
      throttleTime(25),
      map(({ target }: any) => this.calculateScrollPercent(target.scrollingElement)),
      tap(console.log) 
    );
    this.progress$.subscribe(percent => {
      if(percent > 15) {
        this.isNavFixed$ = of(true);
      } else {
        this.isNavFixed$ = of(false);
      }
    });
  }

  calculateScrollPercent(element: HTMLElement) {
    const { scrollTop, scrollHeight, clientHeight } = element;
    // console.log("el", element)
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }
}
