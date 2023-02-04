import { mockMovies } from '../mock/data.js';
import Observable from '../framework/observable.js';

export default class MoviesModel extends Observable {
  #moviesData = mockMovies;


  get moviesData() {
    return this.#moviesData;
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
