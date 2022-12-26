import { humanizeCommentDate } from '../../utile.js';
import AbstractView from '../../framework/view/abstract-view.js';
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

export default class PopupCommentsView extends AbstractView {
  #commentsData = null;

  constructor(commentsData) {
    super();
    this.#commentsData = commentsData;
  }

  get template() {
    return createPopupCommentTemplate(this.#commentsData);
  }
}
