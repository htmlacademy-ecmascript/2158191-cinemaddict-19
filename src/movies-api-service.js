import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class MoviesApiService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  async updateMovie(movieData) {
    const response = await this._load({
      url: `movies/${movieData.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(movieData)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(movie) {
    const filmInfo = movie.filmInfo;
    const userDetails = movie.userDetails;

    const adaptedMovie = {...movie,
      'film_info': {
        title: filmInfo.title,
        'alternative_title': filmInfo.alternativeTitle,
        'total_rating': filmInfo.totalRating,
        poster: filmInfo.poster,
        'age_rating': filmInfo.ageRating,
        director: filmInfo.director,
        writers: filmInfo.writers,
        actors: filmInfo.actors,
        release: {
          date: filmInfo.release.date,
          'release_country':filmInfo.release.releaseCountry,
        },
        duration: filmInfo.duration,
        genre: filmInfo.genre,
        description: filmInfo.description,
      },
      'user_details': {
        watchlist: userDetails.watchlist,
        'already_watched': userDetails.alreadyWatched,
        'watching_date': userDetails.watchingDate,
        favorite: userDetails.favorite,
      }
    };

    delete adaptedMovie.userDetails;
    delete adaptedMovie.filmInfo;

    return adaptedMovie;
  }
}
