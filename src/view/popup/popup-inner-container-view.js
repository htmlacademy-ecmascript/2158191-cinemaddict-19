import AbstractView from '../../framework/view/abstract-view.js';

function createPopupInnerContainerTemplate() {
  return (
    '<div class="film-details__inner"></div>'
  );
}

export default class PopupInnerContainerView extends AbstractView {
  get template() {
    return createPopupInnerContainerTemplate();
  }
}
