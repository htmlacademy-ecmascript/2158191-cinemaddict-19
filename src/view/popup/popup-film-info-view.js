import {createElement} from '../../render.js';
import {humanizeReleaseDate} from '../../utile.js';
import {convertTimeFormat} from '../../utile.js';

function createPopupFilmInfoTemplate({filmInfo: {title, alternativeTitle, poster, totalRating, release, genre, duration, description, ageRating, actors, writers, director}, userDetails }) {

  const releaseDate = humanizeReleaseDate(release.date);
  const filmDuration = convertTimeFormat(duration);
  const watchlistClassName = userDetails.watchlist ? 'film-details__control-button--active' : '';
  const alreadyWatchedClassName = userDetails.alreadyWatched ? 'film-details__control-button--active' : '';
  const favoriteClassName = userDetails.favorite ? 'film-details__control-button--active' : '';

  return (
    `<div class="film-details__info-wrap">
       <div class="film-details__poster">
            <img class="film-details__poster-img" src=${poster} alt="">
  
            <p class="film-details__age">${ageRating}</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${alternativeTitle}</p>
              </div>
  
              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>
  
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Duration</td>
                <td class="film-details__cell">${filmDuration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${genre}</span>
              </tr>
            </table>
  
            <p class="film-details__film-description">${description}</p>
          </div>
        </div>
  
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClassName}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>`
  );
}

export default class PopupView {
  constructor(movieInfo) {
    this.movieInfo = movieInfo;
  }

  getTemplate() {
    return createPopupFilmInfoTemplate(this.movieInfo);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
