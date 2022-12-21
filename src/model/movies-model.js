import { mockMovies } from '../mock/data.js';
import { mockComments } from '../mock/data.js';

const CARD_COUNT = 5;

export default class MoviesModel {
  #moviesDataSliced = mockMovies.slice(0, CARD_COUNT);
  #movieComments = mockComments;

  get moviesData() {
    return this.#moviesDataSliced;
  }

  getComments(filmId) {
    return this.moviesData.find((movieData) => movieData.id === filmId).comments.map((comment) => this.#movieComments.find((movieComment) => String(comment) === movieComment.id));
  }
}
