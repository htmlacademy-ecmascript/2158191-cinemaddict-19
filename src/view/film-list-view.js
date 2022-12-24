import {createElement} from '../render.js';

function createFilmListTemplate(headerText) {
  return (
    `<section class="films-list">
        ${headerText ? `<h2 class="films-list__title">${headerText}</h2>` : ''}
     </section>`
  );
}

export default class FilmListView {
  #element = null;
  #headerText = null;
  constructor(headerText) {
    this.#headerText = headerText;
  }

  get template() {
    return createFilmListTemplate(this.#headerText);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
