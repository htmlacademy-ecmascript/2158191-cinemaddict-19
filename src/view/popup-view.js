import PopupContainerView from '../view/popup/popup-container-view.js';
import PopupFilmInfoContainerView from '../view/popup/popup-film-info-container-view.js';
import PopupFilmInfoView from '../view/popup/popup-film-info-view';
import PopupCommentsView from '../view/popup/popup-comments-view.js';
import PopupCommentsContainerView from '../view/popup/popup-comments-container-view.js';
import PopupCommentsListContainerView from '../view/popup/popup-comments-list-container-view.js';
import PopupNewCommentView from '../view/popup/popup-newcomment-view.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class PopupView extends AbstractView {
  #popupContainer = new PopupContainerView().element;
  #popupFilmInfoContainer = new PopupFilmInfoContainerView().element;
  #popupCommentsListContainer = new PopupCommentsListContainerView().element;

  #element = null;
  #movieData = null;
  #commentsData = null;
  #popupCommentsContainer = null;
  #handleClick = null;

  constructor({movieData, commentsData, onCloseButtonClick}) {
    super();
    this.#movieData = movieData;
    this.#commentsData = commentsData;
    this.#handleClick = onCloseButtonClick;
  }

  get element() {
    this.#popupCommentsContainer = new PopupCommentsContainerView(this.#movieData.comments.length).element;

    if(this.#movieData.comments.length) {
      for (let i = 0; i < this.#movieData.comments.length; i++) {
        this.#popupCommentsListContainer.appendChild(new PopupCommentsView(this.#commentsData[i]).element);
      }
    }

    this.#popupCommentsContainer.appendChild(this.#popupCommentsListContainer);
    this.#popupCommentsContainer.appendChild(new PopupNewCommentView().element);
    this.#popupFilmInfoContainer.appendChild(new PopupFilmInfoView(this.#movieData).element);
    this.#popupContainer.appendChild(this.#popupFilmInfoContainer);
    this.#popupContainer.appendChild(this.#popupCommentsContainer);

    if (!this.#element) {
      this.#element = document.createElement('div');
      this.#element.appendChild(this.#popupContainer);
      this.#element.querySelector('.film-details__close-btn').addEventListener('click', this.#handleClick);
    }

    return this.#element.firstElementChild;
  }
}
