import {createElement} from '../render.js';

function createPopupCommentsListContainerTemplate() {
  return (
    '<ul class="film-details__comments-list"></ul>'
  );
}

export default class PopupCommentsListContainerView {
  getTemplate() {
    return createPopupCommentsListContainerTemplate();
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
