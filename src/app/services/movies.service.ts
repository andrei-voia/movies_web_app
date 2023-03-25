import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenresDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl: string = 'https://api.themoviedb.org/3/';
  apiKey: string = '7f3adab7b558b395ea1644e66155ac7d';
  

  //inject the http via constructor (we can inject any injectable class anywhere)
  constructor(private http : HttpClient) { }

  //this will bring data from the movie server
  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`)
    .pipe(switchMap(res => {  //with pipe we can stream what to return (specifically the list of movies that we are interested in only)
      return of(res.results.slice(0, count));   //this will get only the first count number of items instead of the whole array
    }));
  }

  //returns information about one specific movie
  getMovie(id: string) {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`)
  }

  //this will bring the video data of a movie
  getMovieVideos(id: string) {
    return this.http.get<MovieVideoDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
    .pipe(switchMap(res => {
      return of(res.results);
    }));
  }

  //get all genres of movies
  getMoviesGenres() {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
    .pipe(switchMap(res => {
      return of(res.genres);
    }));
  }

  //get the movies of a specific genre
  getMoviesByGenre(genreId: string, pageNumber: number) {
    return this.http.get<MovieDto>(`${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`)
    .pipe(switchMap(res => {  //with pipe we can stream what to return (specifically the list of movies that we are interested in only)
      return of(res.results);   //this will get only the first count number of items instead of the whole array
    }));
  }

  //returns multiple images for one movie
  getMovieImages(id: string) {
    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`)
  }

  //returns multiple images for one movie
  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
  }
  
  //search the movies and check if you searched for a specific movie
  searchMovies(page: number, searchValue?: string) {        //? next to the parameter makes it optional
    //set the uri to be wether search movie or the popular ones
    const uri = searchValue ? '/search/movie' : '/movie/popular';

    return this.http.get<MovieDto>(`${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`)
    .pipe(switchMap(res => {  //with pipe we can stream what to return (specifically the list of movies that we are interested in only)
      return of(res.results);   //this will get only the first count number of items instead of the whole array
    }));
  }
}
