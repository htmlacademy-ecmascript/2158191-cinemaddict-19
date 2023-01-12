import {filter} from '../utils/filter.js';

export function generateFilter(tasks) {
  return Object.entries(filter).map(
    ([filterName, filterTasks]) => ({
      name: filterName,
      count: filterTasks(tasks).length,
    }),
  );
}
