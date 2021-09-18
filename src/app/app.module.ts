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

import { SpeedPipe } from './pipes/speed.pipe';
import { SubNavComponent } from './components/sub-nav/sub-nav.component';

// add to imports
import { 
    MatCard, 
    MatCardModule, 
    MatCardActions, 
    MatCardAvatar, 
    MatCardFooter, 
    MatCardImage, 
    MatCardTitleGroup, 
    MatCardTitle, 
    MatCardSubtitle, 
    MatCardHeader,  
    MatCardContent, 
  } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    NewsFeedComponent,
    NavbarComponent,
    TopArticlesComponent,
    SpeedPipe,
    SubNavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCard, 
    MatCardModule, 
    MatCardActions, 
    MatCardAvatar, 
    MatCardFooter, 
    MatCardImage, 
    MatCardTitleGroup, 
    MatCardTitle, 
    MatCardSubtitle, 
    MatCardHeader,  
    MatCardContent, 
  ],
  providers: [
    NewsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
