import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeReleaseDate } from '../utils/utile.js';
import { convertTimeFormat } from '../utils/utile.js';

function createFilmCardTemplate({comments, filmInfo: {title, poster, totalRating, release, genre, duration, description}, userDetails }, {isDisabled}) {
  const releaseYear = humanizeReleaseDate(release.date).slice(-4);
  const filmDuration = convertTimeFormat(duration);
  const filmDescription = description.length > 140 ? `${description.slice(0, 139)}...` : description;
  const watchlistClassName = userDetails.watchlist ? 'film-card__controls-item--active' : '';
  const alreadyWatchedClassName = userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';
  const favoriteClassName = userDetails.favorite ? 'film-card__controls-item--active' : '';

  return (
    `<article class="film-card">
       <a class="film-card__link">
         <h3 class="film-card__title">${title}</h3>
         <p class="film-card__rating">${totalRating}</p>
         <p class="film-card__info">
           <span class="film-card__year">${releaseYear}</span>
           <span class="film-card__duration">${filmDuration}</span>
           <span class="film-card__genre">${genre[0]}</span>
         </p>
         <img src=${poster} alt="" class="film-card__poster">
         <p class="film-card__description">${filmDescription}</p>
        <span class="film-card__comments">${comments.length} comments</span>
       </a>
       <div class="film-card__controls">
         <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button" ${isDisabled ? 'disabled' : ''}>Add to watchlist</button>
         <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button" ${isDisabled ? 'disabled' : ''}>Mark as watched</button>
         <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button" ${isDisabled ? 'disabled' : ''}>Mark as favorite</button>
       </div>
     </article>`
  );
}

export default class FilmCardView extends AbstractStatefulView {
  #movieData = null;
  #handleFilmCardClick = null;
  #handleFavoriteClick = null;
  #handleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #initialState = {isDisabled: false};

  constructor({movieData, onFilmCardClick, onAlreadyWatchedClick, onFavoriteClick, onWatchlistClick}) {
    super();
    this.#movieData = movieData;
    this.#handleFilmCardClick = onFilmCardClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;

    this._setState(this.#initialState);
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click',this.#watchlistClickHandler);
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createFilmCardTemplate(this.#movieData, this._state);
  }

  #filmCardClickHandler = () => {
    this.#handleFilmCardClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };

  #watchlistClickHandler = () => {
    this.#handleWatchlistClick();
  };

  #alreadyWatchedClickHandler = () => {
    this.#handleAlreadyWatchedClick();
  };
}
