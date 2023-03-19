import { identifierName } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { first } from 'rxjs/operators';
import { Movie, MovieCredits, MovieImages, MovieVideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  movie: Movie | null = null;
  imagesSizes = IMAGES_SIZES;

  //used to get the videos
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    //this is how we get information from the passed url
    this.route.params.pipe(first()).subscribe(({id}) => {   //get the id param directly (with no param.id)
      // console.log(id);

      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);

      // console.log(this.movieImages);
    })
  }

  ngOnDestroy(): void {
    //no need ??
    // console.log("Component destoryed");
  }

  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe(movieData => {
      this.movie = movieData;
    })
  }

  getMovieVideos(id: string) {
    this.moviesService.getMovieVideos(id).subscribe(movieVideosData => {
      this.movieVideos = movieVideosData;
    })
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe(movieImagesData => {
      this.movieImages = movieImagesData;
    })
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe(movieCreditsData => {
      this.movieCredits = movieCreditsData;
    })
  }
}
