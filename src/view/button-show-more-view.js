import AbstractView from '../framework/view/abstract-view.js';

function createShowMoreButtonTemplate() {
  return (
    '<button class="films-list__show-more">Show more</button>'
  );
}

export default class ShowMoreButtonView extends AbstractView {
  #handleShowMoreBurronClick = null;

  constructor({onShowMoreButtonClick}) {
    super();
    this.#handleShowMoreBurronClick = onShowMoreButtonClick;
    this.element.addEventListener('click', this.#handleShowMoreBurronClick);
  }

  get template() {
    return createShowMoreButtonTemplate();
  }
}
