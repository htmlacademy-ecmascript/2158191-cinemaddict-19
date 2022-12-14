import AbstractView from '../framework/view/abstract-view.js';

function createFooterStatisticsTemplate(moviesAmount) {
  return (
    `<p>${moviesAmount} movies inside</p>`
  );
}

export default class FooterStatisticsView extends AbstractView {
  #moviesAmount = null;

  constructor(moviesAmount) {
    super();
    this.#moviesAmount = moviesAmount;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#moviesAmount);
  }
}
