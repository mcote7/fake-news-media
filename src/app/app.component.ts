import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { fromEvent, Observable, of } from "rxjs";
import { map, throttleTime } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  public scroll$ = fromEvent(document, "scroll");
  public subNavTar: HTMLElement;
  public loadTopicTar: HTMLElement;
  public progress$: Observable<any>;
  public isNavFixed$: Observable<boolean>;
  public isSubNavFixed$: Observable<boolean>;
  public canLoadTopics: boolean;
  public topic: string;

  constructor(private router: ActivatedRoute) {
    this.router.queryParamMap.subscribe((params) => {
      if (params.get("topic") !== null) {
        this.topic = params.get("topic");
        // console.log("YES topic?", this.topic)
      } else {
        this.topic = "technology";
        // console.log("NO topic?", this.topic)
      }
    });
  }

  ngOnInit() {
    document.title = "📰 Fake News Media";
    this.progress$ = this.scroll$.pipe(
      throttleTime(10),
      map(({ target }: any) =>
        this.calculateScrollPercent(target.scrollingElement)
      )
      // tap(console.log)
    );
    this.progress$.subscribe((percent) => {
      this.loadTopicTar = <HTMLElement>document.getElementById("sub-nav");
      this.subNavTar = <HTMLElement>document.getElementById("sub-nav-tar");
      let subTar = document.documentElement.scrollTop + 68; // 68 = height of top-nav;
      const sub = this.subNavTar.offsetHeight;
      if (percent > 1) {
        this.isNavFixed$ = of(true);
      } else {
        this.isNavFixed$ = of(false);
      }
      if (subTar > sub) {
        this.isSubNavFixed$ = of(true);
      } else {
        this.isSubNavFixed$ = of(false);
      }
    });
  }

  ngAfterViewInit() {
    const subNavTar = <HTMLElement>document.querySelector("#sub-nav");
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          console.log("in the view");
          this.canLoadTopics = true;
          observer.unobserve(entry.target);
        } else {
          console.log("out of view");
        }
      });
    });
    observer.observe(subNavTar);
  }

  calculateScrollPercent(element: HTMLElement) {
    const { scrollTop, scrollHeight, clientHeight } = element;
    // console.log("el", element)
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }
}
