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
      body: JSON.stringify(movieData),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(movie) {
    const adaptedMovie = {...movie,
      'film_info': {
        title: movie.filmInfo.title,
        alternativeTitle: movie.filmInfo.alternativeTitle,
        totalRating: movie.filmInfo.totalRating,
        poster: movie.filmInfo.poster,
        ageRating: movie.filmInfo.ageRating,
        director: movie.filmInfo.director,
        writers: movie.filmInfo.writers,
        actors: movie.filmInfo.actors,
        release: {
          date: movie.filmInfo.release.date,
          'release_country': movie.filmInfo.release.releaseCountry,
        },
        duration: movie.filmInfo.duration,
        genre: movie.filmInfo.genre,
        description: movie.filmInfo.description,
      },
      'user_details': {
        watchlist: movie.userDetails.watchlist,
        'already_watched': movie.userDetails.alreadyWatched,
        'watching_date': movie.userDetails.watchingDate,
        favorite: movie.userDetails.favorite,
      }
    };

    delete adaptedMovie.userDetails;
    delete adaptedMovie.filmInfo;

    return adaptedMovie;
  }
}
