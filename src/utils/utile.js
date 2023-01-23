import dayjs from 'dayjs';

const RELEASE_DATE_FORMAT = 'D MMMM YYYY';
const COMMENT_DATE_FORMAT = 'YYYY/MM/DD HH:mm';

export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function humanizeReleaseDate(releaseDate) {
  return releaseDate ? dayjs(releaseDate).format(RELEASE_DATE_FORMAT) : '';
}

export function humanizeCommentDate(commentDate) {
  return commentDate ? dayjs(commentDate).format(COMMENT_DATE_FORMAT) : '';
}

export function convertTimeFormat(minutes) {
  return `${parseInt(minutes / 60, 10)}h ${parseInt(minutes % 60, 10)}min`;
}

export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export function sortMovieDateDown(movieA, movieB) {
  return dayjs(movieB.filmInfo.release.date).diff(dayjs(movieA.filmInfo.release.date));
}

export function sortMovieRatingDown(movieA, movieB) {
  return movieB.filmInfo.totalRating - movieA.filmInfo.totalRating;
}
