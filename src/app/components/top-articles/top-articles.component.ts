import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/models/article';
import { Subscription } from 'rxjs';
import { fadeOutLong } from 'src/animations/anime';


@Component({
  selector: 'top-articles',
  templateUrl: './top-articles.component.html',
  styleUrls: ['./top-articles.component.scss'],
  animations: [fadeOutLong]
})

export class TopArticlesComponent implements OnInit, OnDestroy {
  
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
  public currentSource: string;
  // public currentArticle: Article;

  public isActive: boolean;
  public isPlaying: boolean;
  public interval: any;
  public speed: number = 4444;
  public isFast: boolean;
  public detailsOpen: boolean = false;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.articles[0] = this.defaultArticle;
    this.getArticleBySource('fox-news');
  }

  getArticleBySource(source:string) {
    this.loadingArticles = true;
    this.detailsOpen = false;
    this.currentSource = source;
    this.sub = this.newsService.getArticlesBysource(source).subscribe(news => {
      // console.log("hey", news);
      if(news && news.articles) {
        this.isPlaying ? this.stopArticles() : '';
        this.articles = news.articles;
        this.preLoadImages();
        // console.log("top articles?", this.articles)
        this.playArticles();
        this.loadingArticles = false;
      } else {
        console.error("no articles??", news)
        this.loadingArticles = false;
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

  playArticles() {
    this.isPlaying = true;
    setTimeout(() => {
      this.interval = setInterval(() => {
        this.articles.push(this.articles.shift());
      }, this.speed);
    });
  }

  stopArticles() {
    this.isPlaying = false;
    clearInterval(this.interval);
    // console.log("stoped playing!!!")
  }

  backwardArticles() {
    this.articles.unshift(this.articles.pop());
  }

  forwardArticles() {
    this.articles.push(this.articles.shift()); 
  }

  setFastSpeed() {
    this.isFast = true;
    clearInterval(this.interval);
    this.speed = 2222;
    this.playArticles();
  }

  setRegSpeed() {
    this.isFast = false;
    clearInterval(this.interval);
    this.speed = 4444;
    this.playArticles();
  }

  toggleSources() {
    this.detailsOpen = !this.detailsOpen;
    console.log("toggle sources?", this.detailsOpen)
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
    this.stopArticles();
  }
}
