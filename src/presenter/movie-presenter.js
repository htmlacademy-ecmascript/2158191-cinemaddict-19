import PopupView from '../view/popup-view';
import FilmCardView from '../view/film-card-view.js';
import { render, remove, replace } from '../framework/render';
import { UserAction, UpdateType } from '../const.js';

const PopupState = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
};

export default class MoviePresenter {
  #popupComponent = null;
  #filmCardComponent = null;
  #movieData = null;
  #filmListContainerComponent = null;
  #handleDataChange = null;
  #handlePopupStateChange = null;

  #popupState = PopupState.CLOSED;
  #scrollPosition = 0;

  constructor({filmListContainerComponent, onDataChange, onPopupStateChange}) {
    this.#filmListContainerComponent = filmListContainerComponent;
    this.#handleDataChange = onDataChange;
    this.#handlePopupStateChange = onPopupStateChange;
  }


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFavoriteClick = (updateType) => {
    this.#scrollPosition = this.#popupComponent.element.scrollTop;
    this.#handleDataChange(
      UserAction.UPDATE_MOVIE,
      updateType,
      {
        ...this.#movieData,
        userDetails: {
          favorite: !this.#movieData.userDetails.favorite,
          watchlist: this.#movieData.userDetails.watchlist,
          alreadyWatched: this.#movieData.userDetails.alreadyWatched
        }
      });
  };

  #handleWatchlistClick = (updateType) => {
    this.#scrollPosition = this.#popupComponent.element.scrollTop;
    this.#handleDataChange(
      UserAction.UPDATE_MOVIE,
      updateType,
      {
        ...this.#movieData,
        userDetails: {
          watchlist: !this.#movieData.userDetails.watchlist,
          favorite: this.#movieData.userDetails.favorite,
          alreadyWatched: this.#movieData.userDetails.alreadyWatched
        }
      });
  };

  #handleAlreadyWatchedClick = (updateType) => {
    this.#scrollPosition = this.#popupComponent.element.scrollTop;
    this.#handleDataChange(
      UserAction.UPDATE_MOVIE,
      updateType,
      {
        ...this.#movieData,
        userDetails: {
          alreadyWatched: !this.#movieData.userDetails.alreadyWatched,
          watchlist: this.#movieData.userDetails.watchlist,
          favorite: this.#movieData.userDetails.favorite,
        }
      });
  };

  #handleDeleteClick = (comment) => {
    this.#scrollPosition = this.#popupComponent.element.scrollTop;

    this.#handleDataChange(
      UserAction.UPDATE_MOVIE,
      UpdateType.PATCH,
      {...this.#movieData,
        comments: this.#movieData.comments.filter((commentId) => commentId !== comment.id)
      }
    );

    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      '',
      comment
    );
  };

  #handleFormSubmit = (comment) => {
    const id = String(Math.random());
    this.#scrollPosition = this.#popupComponent.element.scrollTop;

    this.#handleDataChange(
      UserAction.ADD_COMMENT,
      '',
      {id:id, author: 'unknown', ...comment, date: '2005-05-11T16:12:32.554Z'},
    );

    this.#handleDataChange(
      UserAction.UPDATE_MOVIE,
      UpdateType.PATCH,
      {...this.#movieData,
        comments: this.#movieData.comments.push(id),
      }
    );
  };

  init(movieData, commentsData) {
    this.#movieData = movieData;

    const prevPopupComponent = this.#popupComponent;
    const prevFilmCardComponent = this.#filmCardComponent;

    this.#popupComponent = new PopupView({
      movieData: this.#movieData,
      commentsData,
      onCloseButtonClick: () => {
        this.#closePopup();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
      onWatchlistClick: this.#handleWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
      onDeleteClick: this.#handleDeleteClick,
      onFormSubmit: this.#handleFormSubmit,
    });

    this.#filmCardComponent = new FilmCardView({
      movieData: this.#movieData,
      onFilmCardClick: () => {
        this.#showPopup();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
      onWatchlistClick: this.#handleWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
    });

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      render(this.#filmCardComponent, this.#filmListContainerComponent);
      return;
    }

    if (document.body.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
      this.#popupComponent.element.scrollTo(0, this.#scrollPosition);
      this.#scrollPosition = 0;
    }

    if (this.#filmListContainerComponent.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevPopupComponent);
    remove(prevFilmCardComponent);
  }

  resetView() {
    if (this.#popupState !== PopupState.CLOSED) {
      this.#closePopup();
    }
  }

  destroy() {
    remove(this.#popupComponent);
    remove(this.#filmCardComponent);
  }


  #closePopup() {
    remove(this.#popupComponent);
    document.body.classList.remove('hide-overflow');
    this.popupState = PopupState.CLOSED;
    this.#popupComponent.resetPopupNewCommentView();
  }

  #showPopup() {
    this.#handlePopupStateChange();
    render(this.#popupComponent, document.body);
    this.#popupState = PopupState.OPENED;
    document.body.classList.add('hide-overflow');
  }
}
