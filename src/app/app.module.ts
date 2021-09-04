import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';

import { NewsService } from './services/news.service';

import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopArticlesComponent } from './components/top-articles/top-articles.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsFeedComponent,
    NavbarComponent,
    TopArticlesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    NewsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
