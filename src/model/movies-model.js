import {getRandomMovie} from '../mock/card.js';

const CARD_COUNT = 5;

export default class MoviesModel {
  movies = Array.from({length: CARD_COUNT}, getRandomMovie);

  getMovies() {
    return this.movies;
  }
}
