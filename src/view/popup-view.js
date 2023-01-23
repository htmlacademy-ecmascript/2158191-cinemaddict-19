import PopupContainerView from '../view/popup/popup-container-view.js';
import PopupFilmInfoContainerView from '../view/popup/popup-film-info-container-view.js';
import PopupFilmInfoView from '../view/popup/popup-film-info-view.js';
import PopupCommentsView from '../view/popup/popup-comments-view.js';
import PopupCommentsContainerView from '../view/popup/popup-comments-container-view.js';
import PopupCommentsListContainerView from '../view/popup/popup-comments-list-container-view.js';
import PopupNewCommentView from '../view/popup/popup-newcomment-view.js';
import PopupInnerContainerView from '../view/popup/popup-inner-container-view.js';
import PopupFilmInfoButtonsView from '../view/popup/popup-film-info-buttons-view.js';
import AbstractView from '../framework/view/abstract-view.js';
import { render } from '../framework/render';

export default class PopupView extends AbstractView {
  #popupContainer = new PopupContainerView().element;
  #popupCommentsListContainer = new PopupCommentsListContainerView();
  #popupInnerContainer = new PopupInnerContainerView();

  #element = null;
  #movieData = null;
  #commentsData = null;
  #popupCommentsContainer = null;

  #handleFavoriteClick = null;
  #handleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #popupFilmInfoContainer = null;

  constructor({movieData, commentsData, onCloseButtonClick, onFavoriteClick, onWatchlistClick, onAlreadyWatchedClick}) {
    super();
    this.#movieData = movieData;
    this.#commentsData = commentsData;
    this.#popupFilmInfoContainer = new PopupFilmInfoContainerView(onCloseButtonClick);
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;

  }

  get element() {
    if (!this.#element) {
      this.#popupCommentsContainer = new PopupCommentsContainerView(this.#movieData.comments.length);

      if(this.#movieData.comments.length) {
        for (let i = 0; i < this.#movieData.comments.length; i++) {
          render(new PopupCommentsView(this.#commentsData[i]), this.#popupCommentsListContainer.element);
        }
      }

      render(this.#popupCommentsListContainer, this.#popupCommentsContainer.element);
      render(new PopupNewCommentView(), this.#popupCommentsContainer.element);
      render(new PopupFilmInfoView(this.#movieData), this.#popupFilmInfoContainer.element);
      render(new PopupFilmInfoButtonsView({
        movieData: this.#movieData,
        onFavoriteClick: this.#handleFavoriteClick,
        onWatchlistClick: this.#handleWatchlistClick,
        onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
      }), this.#popupFilmInfoContainer.element);
      render(this.#popupFilmInfoContainer, this.#popupInnerContainer.element);
      render(this.#popupCommentsContainer, this.#popupInnerContainer.element);
      render(this.#popupInnerContainer, this.#popupContainer);

      this.#element = this.#popupContainer;
    }

    return this.#element;
  }
}
