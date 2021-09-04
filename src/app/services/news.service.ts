import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import * as Constants from 'src/constants';

// GET https://gnews.io/api/v4/top-headlines?token=

// TODO: add interface for articles 

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {}

  // get top stories 
  getTopStories(): Observable<any> {
    return this.http.get(`https://gnews.io/api/v4/top-headlines?token=${Constants.API_KEY}`)
      .pipe(catchError((error:any) => error));
  }

  // get stories by category 

  // get stories by country (see list) 




  // getRecipes(item: string): Observable<any> {
  //   return this.http.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${item}&app_id=840ddb17&app_key=a87b671f3cf3187d51e086ef777d24fe&random=true`)
  //     .pipe(catchError((error: any) => error))
  // }
}
