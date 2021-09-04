import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";

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
// https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json

// https://saurav.tech/NewsAPI/everything/<source_id>.json
// sources: {
//   bbc-news
//   cnn
//   fox-news
//   google-news
// }
// 'https://saurav.tech/NewsAPI/everything/fox-news.json'


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {}

  // get top Articles 
  getTopArticles(): Observable<any> {
    var url = 'https://saurav.tech/NewsAPI/everything/fox-news.json';
    return this.http.get(url)
      .pipe(catchError((error:any) => error));
  }

  // get Articles by category 

  // get Articles by country (see list) 

  // get Articles by search term 

}
