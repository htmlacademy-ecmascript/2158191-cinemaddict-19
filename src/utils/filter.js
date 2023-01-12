import {FILTER_TYPE} from '../const';

export const filters = {
  [FILTER_TYPE.ALL]: (movies) => movies.filter((movie) => !movie.userDetails.watchlist),
  [FILTER_TYPE.WATCHLIST]: (movies) => movies.filter((movie) => movie.userDetails.watchlist),
  [FILTER_TYPE.HISTORY]: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched),
  [FILTER_TYPE.FAVORITES]: (movies) => movies.filter((movie) => movie.userDetails.favorite),
};
