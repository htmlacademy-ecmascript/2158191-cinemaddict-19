import AbstractView from '../../framework/view/abstract-view.js';
import {humanizeReleaseDate} from '../../utils/utile.js';
import {convertTimeFormat} from '../../utils/utile.js';

function createPopupFilmInfoTemplate({filmInfo: {title, alternativeTitle, poster, totalRating, release, genre, duration, description, ageRating, actors, writers, director}}) {
  const releaseDate = humanizeReleaseDate(release.date);
  const filmDuration = convertTimeFormat(duration);

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
                <td class="film-details__term">Genre${(genre.length > 1) ? 's' : ''}</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${genre}</span>
              </tr>
            </table>
  
            <p class="film-details__film-description">${description}</p>
        </div>
      </div>`
  );
}

export default class PopupFilmInfoView extends AbstractView {
  #movieInfo = null;

  constructor(movieInfo) {
    super();
    this.#movieInfo = movieInfo;
  }

  get template() {
    return createPopupFilmInfoTemplate(this.#movieInfo);
  }
}
