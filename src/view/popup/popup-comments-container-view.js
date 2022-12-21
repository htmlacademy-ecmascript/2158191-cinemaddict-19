import {createElement} from '../../render.js';

function createPopupCommentsContainerTemplate(commentsAmount) {
  return (
    `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsAmount}</span></h3>
      </section>
    </div>`
  );
}

export default class PopupCommentsContainerView {
  #element = null;
  #commentsAmount = null;

  constructor(commentsAmount) {
    this.#commentsAmount = commentsAmount;
  }

  get template() {
    return createPopupCommentsContainerTemplate(this.#commentsAmount);
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
