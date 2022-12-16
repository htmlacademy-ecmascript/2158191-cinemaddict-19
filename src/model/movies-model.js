import { mockMovies } from '../mock/data.js';
import { mockComments } from '../mock/data.js';

const CARD_COUNT = 5;

export default class MoviesModel {
  moviesData = mockMovies.slice(0, CARD_COUNT);
  movieComments = mockComments;

  getMoviesData() {
    this.moviesData.forEach((movieData) => {
      movieData.comments = movieData.comments.map((comment) => this.movieComments.find((movieComment) => comment === movieComment.id));
    });
    return this.moviesData;
  }
}
