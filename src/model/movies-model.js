import { mockMovies } from '../mock/data.js';
import Observable from '../framework/observable.js';

export default class MoviesModel extends Observable {
  #moviesData = mockMovies;
  #moviesApiService = null;

  constructor({moviesApiService}) {
    super();
    this.#moviesApiService = moviesApiService;

    this.#moviesApiService.movies.then((movies) => {
      console.log(movies.map((movie)=> this.#adaptToClient(movie)));
    });
  }

  get moviesData() {
    return this.#moviesData;
  }

  #adaptToClient(movie) {
    const adaptedMovie = {...movie,
      filmInfo: {
        title: movie['film_info'].title,
        alternativeTitle: movie['film_info']['alternative_title'],
        totalRating: movie['film_info']['total_rating'],
        poster: movie['film_info'].poster,
        ageRating: movie['film_info']['age_rating'],
        director: movie['film_info'].director,
        writers: movie['film_info'].writers,
        actors: movie['film_info'].actors,
        release: {
          date: movie['film_info'].release.date,
          releaseCountry: movie['film_info'].release['release_country'],
        },
        duration: movie['film_info'].duration,
        genre: movie['film_info'].genre,
        description: movie['film_info'].description,
      },
      userDetails: {
        watchlist: movie['user_details'].watchlist,
        alreadyWatched: movie['user_details'].already_watched,
        watchingDate: movie['user_details'].watching_date,
        favorite: movie['user_details'].favorite,
      }
    };

    delete adaptedMovie['user_details'];
    delete adaptedMovie['film_info'];

    return adaptedMovie;
  }


  updateMovie(updateType, update) {
    const index = this.#moviesData.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#moviesData = [
      ...this.#moviesData.slice(0, index),
      update,
      ...this.#moviesData.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
