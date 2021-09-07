import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/models/article';
import { Subscription } from 'rxjs';

@Component({
  selector: 'news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit, OnDestroy {

  constructor(private newsService: NewsService) {}

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
  public currentCatrgory: string;

  ngOnInit() {
    this.getArticlesByCategory('technology');
  }

  getArticlesByCategory(category: string) {
    this.loadingArticles = true;
    this.currentCatrgory = category;
    // console.log();
    this.sub = this.newsService.getArticlesByCategory(category).subscribe(news => {
      if(news && news.articles) {
        this.articles = news.articles;
        this.preLoadImages();
        this.loadingArticles = false;
        console.log("cat articles?", this.articles)
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
