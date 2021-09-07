import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/models/article';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit, OnDestroy, OnChanges {

  @Input('topic') topic: string;

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
  // public currentTopic: string;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.getArticlesByCategory();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes???",changes)
    if(changes.topic) {
      this.getArticlesByCategory();
    }
  }

  getArticlesByCategory() { // will @Input topic...
    this.loadingArticles = true;
    // this.currentTopic = topic;
    // console.log();
    this.sub = this.newsService.getArticlesByTopic(this.topic).subscribe(news => {
      if(news && news.articles) {
        this.articles = news.articles;
        this.preLoadImages();
        this.loadingArticles = false;
        console.log("topic articles?", this.articles)
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
      // console.log("pre-load images?", img, i+1)
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
