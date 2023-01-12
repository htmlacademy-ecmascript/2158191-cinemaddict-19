import {filters} from '../utils/filter.js';

export function generateFilter(movies) {
  return Object.entries(filters).map(
    ([filterName, filterMovies]) => ({
      name: filterName,
      count: filterMovies(movies).length,
    }),
  );
}
