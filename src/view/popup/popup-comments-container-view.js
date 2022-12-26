import AbstractView from '../../framework/view/abstract-view.js';

function createPopupCommentsContainerTemplate(commentsAmount) {
  return (
    `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsAmount}</span></h3>
      </section>
    </div>`
  );
}

export default class PopupCommentsContainerView extends AbstractView {
  #commentsAmount = null;

  constructor(commentsAmount) {
    super();
    this.#commentsAmount = commentsAmount;
  }

  get template() {
    return createPopupCommentsContainerTemplate(this.#commentsAmount);
  }
}
