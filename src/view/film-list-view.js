import AbstractView from '../framework/view/abstract-view.js';

function createFilmListTemplate(headerText) {
  return (
    `<section class="films-list">
        ${headerText ? `<h2 class="films-list__title">${headerText}</h2>` : ''}
     </section>`
  );
}

export default class FilmListView extends AbstractView{
  #headerText = null;

  constructor(headerText) {
    super();
    this.#headerText = headerText;
  }

  get template() {
    return createFilmListTemplate(this.#headerText);
  }
}
