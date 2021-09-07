import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {}

  // get top Articles by source (see list) 
  getArticlesBysource(source: string): Observable<any> {
    const url = `https://saurav.tech/NewsAPI/everything/${source}.json`;
    return this.http.get(url)
      .pipe(catchError((error:any) => error));
  }

  // get Articles by category (see list) 
  getArticlesByTopic(topic: string): Observable<any> {
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${topic}/us.json`;
    return this.http.get(url)
      .pipe(catchError((error:any) => error));
  }


  // get Articles by country (see list) 

  // get Articles by search term 
}


// https://saurav.tech/NewsAPI/top-headlines/category/<category>/<countryCode>.json
// cats: {
//   business
//   entertainment
//   general
//   health
//   science
//   sports
//   technology
// }
// EX: https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json

// https://saurav.tech/NewsAPI/everything/<source_id>.json
// sources: {
//   bbc-news
//   cnn
//   fox-news
//   google-news
// }
// EX: https://saurav.tech/NewsAPI/everything/fox-news.json