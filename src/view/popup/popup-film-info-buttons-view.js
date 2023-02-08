import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

function createPopupFilmInfoButtonsTemplate({userDetails}, {isDisabled}) {
  const watchlistClassName = userDetails.watchlist ? 'film-details__control-button--active' : '';
  const alreadyWatchedClassName = userDetails.alreadyWatched ? 'film-details__control-button--active' : '';
  const favoriteClassName = userDetails.favorite ? 'film-details__control-button--active' : '';

  return (
    `<section class="film-details__controls">
       <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistClassName}" id="watchlist" name="watchlist" ${isDisabled ? 'disabled' : ''}>Add to watchlist</button>
       <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClassName}" id="watched" name="watched" ${isDisabled ? 'disabled' : ''}>Already watched</button>
       <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClassName}" id="favorite" name="favorite" ${isDisabled ? 'disabled' : ''}>Add to favorites</button>
    </section>`
  );
}

export default class PopupFilmInfoButtonsView extends AbstractStatefulView {
  #movieInfo = null;
  #handleFavoriteClick = null;
  #handleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #initialState = {isDisabled: false};

  constructor({movieData, onFavoriteClick, onWatchlistClick, onAlreadyWatchedClick}) {
    super();
    this.#movieInfo = movieData;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;

    this._setState(this.#initialState);
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPopupFilmInfoButtonsTemplate(this.#movieInfo, this._state);
  }

  #favoriteClickHandler = () =>{
    this.#handleFavoriteClick();
  };

  #watchlistClickHandler = () =>{
    this.#handleWatchlistClick();
  };

  #alreadyWatchedClickHandler = () =>{
    this.#handleAlreadyWatchedClick();
  };
}
