import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Movies } from './movie';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  providers: [MoviesService],
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movies | undefined;
  movieName = '';

  constructor(private moviesService: MoviesService) {}

  @ViewChild('movieEditInput')
  set movieEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.moviesService.searchMovies('').subscribe((movies) => {
      console.log('Movies >>>>', movies);
      this.movies = movies;
    });
  }

  search(searchTerm: string) {
    if (searchTerm) {
      this.moviesService.searchMovies(searchTerm).subscribe((movies) => {
        console.log('Movies >>>>', movies);
        this.movies = movies;
      });
    } else {
      this.getMovies();
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
