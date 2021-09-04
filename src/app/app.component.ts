import { Component, OnInit } from '@angular/core';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fake-news-media';

  constructor(private newsService: NewsService) {}
  
  ngOnInit() {
    this.newsService.getTopArticles().subscribe(news => {
      console.log("top stories?", news)
    });
  }
}
