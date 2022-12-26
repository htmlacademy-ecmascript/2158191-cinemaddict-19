import AbstractView from '../framework/view/abstract-view.js';

function createContentTemplate() {
  return (
    '<section class="films"></section>'
  );
}

export default class ContentView extends AbstractView {
  get template() {
    return createContentTemplate();
  }
}
