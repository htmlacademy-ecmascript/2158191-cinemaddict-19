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
  constructor(commentsAmount) {
    this.commentsAmount = commentsAmount;
  }

  getTemplate() {
    return createPopupCommentsContainerTemplate(this.commentsAmount);
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
