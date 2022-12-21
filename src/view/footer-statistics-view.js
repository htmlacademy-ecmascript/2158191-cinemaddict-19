import {createElement} from '../render.js';

function createFooterStatisticsTemplate(moviesAmount) {
  return (
    `<p>${moviesAmount} movies inside</p>`
  );
}

export default class FooterStatisticsView {
  #element = null;
  #moviesAmount = null;

  constructor(moviesAmount) {
    this.#moviesAmount = moviesAmount;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#moviesAmount);
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
