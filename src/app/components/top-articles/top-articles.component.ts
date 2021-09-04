import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/models/article';
import { Subscription } from 'rxjs';

@Component({
  selector: 'top-articles',
  templateUrl: './top-articles.component.html',
  styleUrls: ['./top-articles.component.scss']
})
export class TopArticlesComponent implements OnInit, OnDestroy {
  public sub: Subscription;

  public loadingArticles: boolean;
  public articles: Article[];
  public currentArticle: Article;

  public isActive: boolean;
  public isPlaying: boolean;
  public interval: any;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.getArticleBySource('fox-news');
  }

  getArticleBySource(source:string) {
    this.loadingArticles = true;
    this.sub = this.newsService.getArticlesBysource(source).subscribe(news => {
      // console.log("hey", news);
      if(news && news.articles) {
        this.articles = news.articles;
        console.log("top articles?", this.articles)
        this.playArticles();
        this.loadingArticles = false;
      } else {
        console.error("no articles??", news)
        this.loadingArticles = false;
      }
    });
  }


  playArticles() {
    this.isPlaying = true;
    this.interval = setInterval(() => {
      this.articles.push(this.articles.shift());
    }, 4000);
  }

  stopArticles() {
    this.isPlaying = false;
    clearInterval(this.interval);
  }

  backwardArticles() {
    this.articles.unshift(this.articles.pop());
  }

  forwardArticles() {
    this.articles.push(this.articles.shift()); 
  }

  // resetCurrentArticle() {
  //   this.currentArticle = this.articles[0];
  //   console.log("current Article", this.currentArticle)
  // }

  // setCurrentArticle(i:number) {
  //   this.currentArticle = this.articles[i];
  //   console.log("current Article", this.currentArticle)
  // }

  // getRandomArticle() {
  //   let rand = Math.ceil(Math.random() * 100);
  //   console.log("rand?", rand)
  //   this.currentArticle = this.articles[rand];
  //   console.log("current Article", this.currentArticle)
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
