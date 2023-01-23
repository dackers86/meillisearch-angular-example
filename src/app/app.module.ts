import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesService } from './movies/movies.service';
import { HttpErrorHandler } from './http-error-handler.service';

@NgModule({
  declarations: [AppComponent, MoviesComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [MoviesService, HttpErrorHandler],
  bootstrap: [AppComponent],
})
export class AppModule {}
