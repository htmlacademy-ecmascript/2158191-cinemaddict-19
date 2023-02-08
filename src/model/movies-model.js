import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class MoviesModel extends Observable {
  #moviesData = [];
  #moviesApiService = null;

  constructor({moviesApiService}) {
    super();
    this.#moviesApiService = moviesApiService;
  }

  get moviesData() {
    return this.#moviesData;
  }

  #adaptToClient(movie) {
    const filmInfo = movie['film_info'];
    const userDetails = movie['user_details'];

    const adaptedMovie = {...movie,
      filmInfo: {
        title: filmInfo.title,
        alternativeTitle: filmInfo['alternative_title'],
        totalRating: filmInfo['total_rating'],
        poster: filmInfo.poster,
        ageRating: filmInfo['age_rating'],
        director: filmInfo.director,
        writers: filmInfo.writers,
        actors: filmInfo.actors,
        release: {
          date:filmInfo.release.date,
          releaseCountry: filmInfo.release['release_country'],
        },
        duration: filmInfo.duration,
        genre: filmInfo.genre,
        description: filmInfo.description,
      },
      userDetails: {
        watchlist: userDetails.watchlist,
        alreadyWatched: userDetails.already_watched,
        watchingDate: userDetails.watching_date,
        favorite: userDetails.favorite,
      }
    };

    delete adaptedMovie['user_details'];
    delete adaptedMovie['film_info'];

    return adaptedMovie;
  }

  async init() {
    try {
      const movies = await this.#moviesApiService.movies;
      this.#moviesData = movies.map(this.#adaptToClient);
    } catch(err) {
      this.#moviesData = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updateMovie(updateType, update) {
    const index = this.#moviesData.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    try {
      const response = await this.#moviesApiService.updateMovie(update);
      const updatedMovie = this.#adaptToClient(response);

      this.#moviesData = [
        ...this.#moviesData.slice(0, index),
        updatedMovie,
        ...this.#moviesData.slice(index + 1),
      ];
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t update movie');
    }
  }
}
