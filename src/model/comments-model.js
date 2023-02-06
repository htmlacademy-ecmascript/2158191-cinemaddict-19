import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #movieComments = [];
  #commentsApiService = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#movieComments;
  }


  async init(movieId) {
    try {
      this.#movieComments = await this.#commentsApiService.getComments(movieId);
      return this.#movieComments;
    } catch(err) {
      this.#movieComments = [];
    }
  }


  addComment(updateType, update) {
    this.#movieComments = [
      update,
      ...this.#movieComments,
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this.#movieComments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting movie');
    }

    this.#movieComments = [
      ...this.#movieComments.slice(0, index),
      ...this.#movieComments.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
