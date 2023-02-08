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

  #adaptToClient(movie) {
    const filmInfo = movie['film_info'];
    const userDetails = movie['user_details'];

    const adaptedMovie = {...movie,
      filmInfo: {
        title: filmInfo.title,
        alternativeTitle: filmInfo['alternative_title'],
        totalRating: filmInfo['total_rating'],
        poster: filmInfo.poster,
        ageRating: filmInfo['age_rating'],
        director: filmInfo.director,
        writers: filmInfo.writers,
        actors: filmInfo.actors,
        release: {
          date:filmInfo.release.date,
          releaseCountry: filmInfo.release['release_country'],
        },
        duration: filmInfo.duration,
        genre: filmInfo.genre,
        description: filmInfo.description,
      },
      userDetails: {
        watchlist: userDetails.watchlist,
        alreadyWatched: userDetails.already_watched,
        watchingDate: userDetails.watching_date,
        favorite: userDetails.favorite,
      }
    };

    delete adaptedMovie['user_details'];
    delete adaptedMovie['film_info'];

    return adaptedMovie;
  }

  async addComment(updateType, update) {
    try {
      const newComment = await this.#commentsApiService.addComment(update);
      this.#movieComments = newComment.comments;

      this._notify(updateType, this.#adaptToClient(newComment.movie));
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(updateType, update) {
    try {
      await this.#commentsApiService.deleteComment(update.comment.id);
      this._notify(updateType, update.movie);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  }
}
