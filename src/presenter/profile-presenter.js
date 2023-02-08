import { FilterType } from '../const.js';
import { filters } from '../utils/filter.js';
import { render, remove, replace } from '../framework/render';
import ProfileRatingView from '../view/profile-rating-view.js';

export default class ProfilePresenter {
  #headerContainer = null;
  #moviesModel = null;
  #profileComponent = null;
  #profileText = null;

  constructor({headerContainer, moviesModel}) {
    this.#headerContainer = headerContainer;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModelEventer);
  }

  init() {
    const watchedMovieCount = filters[FilterType.HISTORY](this.#moviesModel.moviesData).length;
    const prevProfileComponent = this.#profileComponent;

    switch(true) {
      case watchedMovieCount === 0:
        this.#profileText = '';
        break;
      case watchedMovieCount <= 10 && watchedMovieCount > 0:
        this.#profileText = 'novice';
        break;
      case watchedMovieCount <= 20 && watchedMovieCount > 10:
        this.#profileText = 'fan';
        break;
      default:
        this.#profileText = 'movie buff';
    }

    this.#profileComponent = new ProfileRatingView(this.#profileText);

    if (prevProfileComponent === null) {
      render(this.#profileComponent, this.#headerContainer);
      return;
    }

    replace(this.#profileComponent, prevProfileComponent);
    remove(prevProfileComponent);
  }

  #handleModelEventer = () => {
    this.init();
  };
}
