import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import * as Constants from 'src/constants';

// GET https://gnews.io/api/v4/top-headlines?token=
// GET https://gnews.io/api/v4/search?q=example&token=API-Token

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {}

  // get top Articles 
  getTopArticles(): Observable<any> {
    return this.http.get(`https://gnews.io/api/v4/top-headlines?token=${Constants.API_KEY}&lang=en`)
      .pipe(catchError((error:any) => error));
  }

  // get Articles by category 

  // get Articles by country (see list) 

  // get Articles by search term 

}
