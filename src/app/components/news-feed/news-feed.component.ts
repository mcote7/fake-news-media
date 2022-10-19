import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/models/article';
import { Observable, Subscription } from 'rxjs';
import { listAnimationWrapCard, listAnimationItemCard } from 'src/animations/anime';

@Component({
  selector: 'news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
  animations: [listAnimationWrapCard,listAnimationItemCard]
})
export class NewsFeedComponent implements OnInit, OnDestroy, OnChanges {

  @Input('topic') topic: string;
  @Input('canLoadTopics') canLoadTopics: boolean;
  @Input('isSubNavFixed$') isSubNavFixed$: Observable<boolean>;

  public toolhide = 10000;

  public sub: Subscription;
  public defaultArticle: Article = {
    title: '',
    author: '',
    content: '',
    description: '',
    publishedAt: '',
    url: '',
    urlToImage: 'assets/black.jpg',
    source: {
      id: '',
      name: ''
    }
  };

  public loadingArticles: boolean;
  public articles: Article[] = [];

  public myColor:string = '#ffeb3b26';
  public tooltipDelay:number = 1000;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("changes???", changes)
    if(changes.canLoadTopics) {
      if(this.canLoadTopics === true) {
        this.getArticlesByCategory();
      }
    }
    if(this.canLoadTopics === true && changes.topic) {
      this.getArticlesByCategory();
    }
  }

  getArticlesByCategory() {
    this.loadingArticles = true;
    // console.log();
    this.sub = this.newsService.getArticlesByTopic(this.topic).subscribe(news => {
      if(news && news.articles) {
        this.articles = news.articles;
        this.preLoadImages();
        // console.log("topic articles?", this.topic, this.articles,"can load", this.canLoadTopics)
      } else {
        this.loadingArticles = false;
        console.error("no articles??", news)
      }
    });
  }

  preLoadImages() {
    for(let i = 0; i < this.articles.length; i++) {
      let img = new Image();
      img.src = this.articles[i].urlToImage;
      img.style.display = 'none';
      document.body.appendChild(img);
      // console.log("pre-load images?", img, i+1)
    }
    this.loadingArticles = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
