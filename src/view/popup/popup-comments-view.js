import he from 'he';
import { humanizeCommentDate } from '../../utils/utile.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { Emotions } from '../../const.js';

function createPopupCommentTemplate({author, comment, date, emotion}, {isDisabled, isDeleting}) {
  const commentDate = humanizeCommentDate(date);
  const commentEmoji = Emotions[emotion];

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src=${commentEmoji} width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        </p>
      </div>
    </li>`
  );
}

export default class PopupCommentsView extends AbstractStatefulView {
  #commentsData = null;
  #handleDeleteClick = null;
  #initialState = {
    isDisabled: false,
    isDeleting: false
  };

  constructor({commentsData, onDeleteClick}) {
    super();
    this.#commentsData = commentsData;
    this.#handleDeleteClick = onDeleteClick;

    this._setState(this.#initialState);
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#deleteClickHandler);
  }

  #deleteClickHandler = () => {
    this.#handleDeleteClick(this.#commentsData);
  };

  get template() {
    return createPopupCommentTemplate(this.#commentsData, this._state);
  }
}
