import { mockMovies } from '../mock/data.js';
import { mockComments } from '../mock/data.js';

export default class MoviesModel {
  #moviesData = mockMovies;
  #movieComments = mockComments;

  get moviesData() {
    return this.#moviesData;
  }

  getComments(filmId) {
    return this.moviesData.find((movieData) => movieData.id === filmId).comments.map((comment) => this.#movieComments.find((movieComment) => String(comment) === movieComment.id));
  }
}
