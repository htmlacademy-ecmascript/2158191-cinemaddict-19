import {createElement} from '../render.js';

function createContentTemplate() {
  return (
    '<section class="films"></section>'
  );
}

export default class ContentView {
  #element = null;

  get template() {
    return createContentTemplate();
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
