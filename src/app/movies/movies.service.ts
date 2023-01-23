import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Movies } from './movie';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer private-4eq3dat7vf32fiovn6hbwfqr',
  }),
};

/* Docs (https://docs.meilisearch.com/reference/api/search.html#search-in-an-index-with-post-route) */

@Injectable()
export class MoviesService {
  hostUrl =
    'https://50428000764a46bcb31dc5af05ee8ea2.ent-search.us-central1.gcp.cloud.es.io';
  moviesDocumentsUrl = `${this.hostUrl}/api/as/v1/engines/movies/documents/list`;
  moviesSearchUrl = `${this.hostUrl}/api/as/v1/engines/movies/search`;
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('MoviesService');
  }

  /** GET Movies from the server */
  getMovies(): Observable<Movies> {
    return this.http
      .get<Movies>(this.moviesDocumentsUrl, httpOptions)
      .pipe(catchError(this.handleError<Movies>('getMovies')));
  }

  /* GET Movies whose name contains search term */
  searchMovies(term: string): Observable<Movies> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = {
      params: new HttpParams().set('query', term),
    };

    return this.http
      .get<Movies>(this.moviesSearchUrl, { ...httpOptions, ...options })
      .pipe(catchError(this.handleError<Movies>('searchMovies')));
  }
}
