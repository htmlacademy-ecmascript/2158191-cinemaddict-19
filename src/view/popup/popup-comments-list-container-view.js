import AbstractView from '../../framework/view/abstract-view.js';

function createPopupCommentsListContainerTemplate() {
  return (
    '<ul class="film-details__comments-list"></ul>'
  );
}

export default class PopupCommentsListContainerView extends AbstractView {
  get template() {
    return createPopupCommentsListContainerTemplate();
  }
}
