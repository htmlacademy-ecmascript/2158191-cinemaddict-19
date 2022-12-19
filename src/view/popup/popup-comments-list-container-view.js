import {createElement} from '../../render.js';

function createPopupCommentsListContainerTemplate() {
  return (
    '<ul class="film-details__comments-list"></ul>'
  );
}

export default class PopupCommentsListContainerView {
  #element = null;

  get template() {
    return createPopupCommentsListContainerTemplate();
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
