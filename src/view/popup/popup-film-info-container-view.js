import AbstractView from '../../framework/view/abstract-view.js';

function createPopupFilmInfoContainerTemplate() {
  return (
    `<div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
    </div>`
  );
}

export default class PopupFilmInfoContainerView extends AbstractView{
  constructor(onCloseButtonClick) {
    super();
    this.element.querySelector('.film-details__close-btn').addEventListener('click', onCloseButtonClick);
  }

  get template() {
    return createPopupFilmInfoContainerTemplate();
  }
}
