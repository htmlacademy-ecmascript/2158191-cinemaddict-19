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
  #popupFilmInfoButtons = null;

  #handleFavoriteClick = null;
  #handleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #popupFilmInfoContainer = null;
  #popupNewCommentView = null;
  #handleDeleteClick = null;
  #popupCommentsView = null;
  #popupCommentsViews = new Map();

  constructor({movieData, commentsData, onCloseButtonClick, onFavoriteClick, onWatchlistClick, onAlreadyWatchedClick, onDeleteClick, onFormSubmit}) {
    super();
    this.#movieData = movieData;
    this.#commentsData = commentsData;
    this.#popupFilmInfoContainer = new PopupFilmInfoContainerView(onCloseButtonClick);
    this.#popupNewCommentView = new PopupNewCommentView(onFormSubmit);
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#handleDeleteClick = onDeleteClick;

  }

  get element() {
    if (!this.#element) {
      this.#popupCommentsContainer = new PopupCommentsContainerView(this.#movieData.comments.length);

      if(this.#commentsData.length) {
        for (let i = 0; i < this.#commentsData.length; i++) {
          render(this.#popupCommentsView = new PopupCommentsView({
            commentsData: this.#commentsData[i],
            onDeleteClick: this.#handleDeleteClick,
          }), this.#popupCommentsListContainer.element);
          this.#popupCommentsViews.set(this.#commentsData[i].id, this.#popupCommentsView);
        }
      }

      render(this.#popupCommentsListContainer, this.#popupCommentsContainer.element);
      render(this.#popupNewCommentView, this.#popupCommentsContainer.element);
      render(new PopupFilmInfoView(this.#movieData), this.#popupFilmInfoContainer.element);
      render(this.#popupFilmInfoButtons = new PopupFilmInfoButtonsView({
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

  resetPopupNewCommentView() {
    this.#popupNewCommentView.reset();
  }

  setSavingComment() {
    this.#popupNewCommentView.updateElement({
      isDisabled: true,
    });
  }

  setEditingFilmInfo() {
    this.#popupFilmInfoButtons.updateElement({
      isDisabled: true,
    });
  }

  setDeletingComment(comment) {
    this.#popupCommentsViews.get(comment.id).updateElement({
      isDisabled: true,
      isDeleting: true,
    });
  }

  setAbortingEditFilmInfo() {
    const resetFormState = () => {
      this.#popupFilmInfoButtons.updateElement({
        isDisabled: false,
      });
    };

    this.#popupFilmInfoButtons.shake(resetFormState);
  }

  setAbortingSaveComment() {
    const resetFormState = () => {
      this.#popupNewCommentView.updateElement({
        isDisabled: false,
      });
    };
    this.#popupFilmInfoButtons.shake(resetFormState);
  }

  setAbortingDeleteComment(comment) {
    const resetFormState = () => {
      this.#popupCommentsViews.get(comment.id).updateElement({
        isDisabled: false,
        isDeleting: false,
      });
    };
    this.#popupCommentsViews.get(comment.id).shake(resetFormState);
  }
}
