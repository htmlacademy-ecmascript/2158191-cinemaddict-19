import { humanizeCommentDate } from '../../utile.js';
import {createElement} from '../../render.js';
import { EMOTIONS } from '../../const.js';

function createPopupCommentTemplate({author, comment, date, emotion}) {
  const commentDate = humanizeCommentDate(date);
  const commentEmoji = EMOTIONS[emotion];

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src=${commentEmoji} width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
}

export default class PopupCommentsView {
  constructor(commentsData) {
    this.commentsData = commentsData;
  }

  getTemplate() {
    return createPopupCommentTemplate(this.commentsData);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
