import { UpdateType } from '../../const.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createPopupFilmInfoButtonsTemplate({userDetails}) {
  const watchlistClassName = userDetails.watchlist ? 'film-details__control-button--active' : '';
  const alreadyWatchedClassName = userDetails.alreadyWatched ? 'film-details__control-button--active' : '';
  const favoriteClassName = userDetails.favorite ? 'film-details__control-button--active' : '';

  return (
    `<section class="film-details__controls">
       <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
       <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClassName}" id="watched" name="watched">Already watched</button>
       <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
    </section>`
  );
}

export default class PopupFilmInfoButtonsView extends AbstractView {
  #movieInfo = null;
  #handleFavoriteClick = null;
  #handleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;

  constructor({movieData, onFavoriteClick, onWatchlistClick, onAlreadyWatchedClick}) {
    super();
    this.#movieInfo = movieData;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPopupFilmInfoButtonsTemplate(this.#movieInfo);
  }

  #favoriteClickHandler = () =>{
    this.#handleFavoriteClick(UpdateType.PATCH);
  };

  #watchlistClickHandler = () =>{
    this.#handleWatchlistClick(UpdateType.PATCH);
  };

  #alreadyWatchedClickHandler = () =>{
    this.#handleAlreadyWatchedClick(UpdateType.PATCH);
  };
}
