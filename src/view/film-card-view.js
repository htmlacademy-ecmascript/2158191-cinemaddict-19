import AbstractView from '../framework/view/abstract-view.js';
import { humanizeReleaseDate } from '../utile.js';
import { convertTimeFormat } from '../utile.js';

function createFilmCardTemplate({comments, filmInfo: {title, poster, totalRating, release, genre, duration, description}, userDetails }) {
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
           <span class="film-card__genre">${genre}</span>
         </p>
         <img src=${poster} alt="" class="film-card__poster">
         <p class="film-card__description">${filmDescription}</p>
        <span class="film-card__comments">${comments.length} comments</span>
       </a>
       <div class="film-card__controls">
         <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
         <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button">Mark as watched</button>
         <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
       </div>
     </article>`
  );
}

export default class FilmCardView extends AbstractView {
  #movieInfo = null;

  constructor(movieInfo) {
    super();
    this.#movieInfo = movieInfo;
  }

  get template() {
    return createFilmCardTemplate(this.#movieInfo);
  }
}
