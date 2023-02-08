import AbstractView from '../framework/view/abstract-view.js';

function createProfileRatingTemplate(profileText) {
  return (
    `<section class="header__profile profile">
       <p class="profile__rating">${profileText}</p>
       <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
     </section>`
  );
}

export default class ProfileRatingView extends AbstractView {
  #profileText = null;

  constructor(profileText) {
    super();
    this.#profileText = profileText;
  }

  get template() {
    return createProfileRatingTemplate(this.#profileText);
  }
}
