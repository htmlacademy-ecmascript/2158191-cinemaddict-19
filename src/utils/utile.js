import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const RELEASE_DATE_FORMAT = 'D MMMM YYYY';

export function humanizeReleaseDate(releaseDate) {
  return releaseDate ? dayjs(releaseDate).format(RELEASE_DATE_FORMAT) : '';
}

export function humanizeCommentDate(commentDate) {
  return dayjs(commentDate).fromNow();
}

export function convertTimeFormat(minutes) {
  return `${parseInt(minutes / 60, 10)}h ${parseInt(minutes % 60, 10)}min`;
}

export function sortMovieDateDown(movieA, movieB) {
  return dayjs(movieB.filmInfo.release.date).diff(dayjs(movieA.filmInfo.release.date));
}

export function sortMovieRatingDown(movieA, movieB) {
  return movieB.filmInfo.totalRating - movieA.filmInfo.totalRating;
}
