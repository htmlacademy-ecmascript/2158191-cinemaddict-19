import { mockMovies } from '../mock/data.js';
import { mockComments } from '../mock/data.js';

const CARD_COUNT = 5;

export default class MoviesModel {
  moviesData = mockMovies.slice(0, CARD_COUNT);
  movieComments = mockComments;

  constructor(filmId) {
    this.filmId = filmId;
  }

  getMoviesData() {
    return this.moviesData;
  }

  getComments() {
    return this.moviesData.find((movieData) => movieData.id === this.filmId).comments.map((comment) => this.movieComments.find((movieComment) => String(comment) === movieComment.id));
  }
}
