import {createElement} from '../../render.js';

function createPopupFilmInfoContainerTemplate() {
  return (
    `<div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
    </div>`
  );
}

export default class PopupFilmInfoContainerView {
  #element = null;

  get template() {
    return createPopupFilmInfoContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
