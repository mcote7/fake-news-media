import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from './services/news.service';
import { Article } from 'src/models/article';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fake-news-media';
  public sub: Subscription;

  public loadingArticles: boolean;
  public articles: Article[];
  public currentArticle: Article;

  constructor(private newsService: NewsService) {}
  
  ngOnInit() {
    this.loadingArticles = true;
    this.sub = this.newsService.getTopArticles().subscribe(news => {
      // console.log("hey", news);
      if(news && news.articles) {
        this.articles = news.articles;
        console.log("top stories?", this.articles)
        this.getCurrentArticle();
      } else {
        console.error("no articles??", news)
        this.loadingArticles = false;
      }
    });
  }

  getCurrentArticle() {
    let rand = Math.ceil(Math.random() * 100);
    console.log("rand?", rand)
    this.currentArticle = this.articles[0];
    this.loadingArticles = false;
    console.log("current Article", this.currentArticle)
  }

  setCurrentArticle(i:number) {
    this.currentArticle = this.articles[i];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
