import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { IMovie, MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  constructor(
    private movieService: MovieService,
    private loadingCtrl: LoadingController
  ) {}
  movies: IMovie[] | [] = [];
  currentPage = 1;

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: any) {
    let loading: HTMLIonLoadingElement | null = null;
    if (!event) {
      loading = await this.loadingCtrl.create({
        message: 'Loading...',
        spinner: 'bubbles',
      });

      await loading.present();
    }

    this.movieService.getTopRatedMovies().subscribe((res) => {
      loading?.dismiss();
      this.movies = [...this.movies!, ...res.results];
      event?.target.complete();
    });
  }

  loadMoreMovies(event: any) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
