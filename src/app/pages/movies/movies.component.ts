import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  genreId: string | null = null;

  //used for the input of the search
  searchValue: string | null = null;


  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //take is for performance, take params for 1 time and then end subscription end immediately
    this.route.params.pipe(take(1)).subscribe(({genreId}) => {
      //now check if the http is normal movies or normal genres id to show specific genre
      if(genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      }
      else {
        this.getPagedMovies(1);
      }
    })

    //this is how we initialize / give value to the input field in the template
    // this.searchValue = "search for movies here, daddy xoxo :>";
  }

  getPagedMovies(page: number, searchKeyword?: string) {    //? next to the parameter makes it optional
    this.moviesService.searchMovies(page, searchKeyword).subscribe(movies => {
      this.movies = movies;
    })
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe(movies => {
      this.movies = movies;
    })
  }

  //this is implemented for the pagination component, to go to the next page when required
  paginate(event: any) {
    //get the page to show
    const pageNumber = event.page + 1; //(0 + 1 starting first page)

    if(this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    }
    else {
      if(this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue)
      }
      else {
        this.getPagedMovies(pageNumber)
      }
    }
  }

  searchChanged() {
    // console.log(this.searchValue);

    //check if the search value is not null so we avoid error
    if(this.searchValue)
      this.getPagedMovies(1, this.searchValue)
  }
}
