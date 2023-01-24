import ShowMoreButtonView from '../view/button-show-more-view.js';
import SortView from '../view/sort-view.js';
import ContentView from '../view/content-view.js';
import FilmListContainerView from '../view/film-list-container.js';
import FilmListView from '../view/film-list-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import MenuView from '../view/menu-view.js';
import MoviePresenter from './movie-presenter.js';
import ProfileRatingView from '../view/profile-rating-view.js';
import { render, remove } from '../framework/render.js';
import {generateFilter} from '../mock/filter.js';
import { updateItem, sortMovieDateDown, sortMovieRatingDown} from '../utils/utile.js';
import { SortType } from '../const.js';

const HeaderText = {
  noMovies: 'There are no movies in our database',
  noFavoirte: 'There are no favorite movies now',
  noHistory: 'There are no watched movies now',
  noWatchList: 'There are no movies to watch now',
};

const FILM_CARD_COUNT_PER_STEP = 5;

export default class СinemaPresenter {
  #mainContainer = null;
  #headerProfile = null;
  #footer = null;
  #moviesModel = null;
  #moviesData = null;
  #moviePresenter = null;
  #filters = null;
  #filmListComponent = null;
  #showMoreButtonComponent = null;

  #renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
  #moviePresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedMoviesData = [];

  #filmListContainerComponent = new FilmListContainerView();
  #contentComponent = new ContentView();

  constructor({headerProfile, mainContainer, footer, moviesModel}) {
    this.#mainContainer = mainContainer;
    this.#headerProfile = headerProfile;
    this.#footer = footer;
    this.#moviesModel = moviesModel;
    this.#filters = generateFilter([...this.#moviesModel.moviesData]);
  }

  #renderHeaderProfile() {
    render(new ProfileRatingView(), this.#headerProfile);
  }

  #renderMenu() {
    render(new MenuView(this.#filters), this.#mainContainer);
  }

  #renderSort() {
    render(new SortView({onSortTypeChange: this.#handleSortTypeChange}), this.#mainContainer);
  }

  #renderMainContent() {
    render(this.#contentComponent, this.#mainContainer);

    if(!this.#moviesData.length) {
      this.#filmListComponent = new FilmListView(HeaderText.noMovies);

      render(this.#filmListComponent, this.#contentComponent.element);

      return;
    }

    this.#filmListComponent = new FilmListView();

    render(this.#filmListComponent, this.#contentComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);

    for (let i = 0; i < Math.min(this.#moviesData.length, FILM_CARD_COUNT_PER_STEP); i++) {
      this.#renderFilmCardWithPopup(this.#moviesData[i]);
    }

    if (this.#moviesData.length > FILM_CARD_COUNT_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({onShowMoreButtonClick: this.#HandleShowMoreButtonClick});

      render(this.#showMoreButtonComponent, this.#filmListContainerComponent.element);
    }
  }

  #renderFooterStatistics() {
    render(new FooterStatisticsView(this.#moviesData.length), this.#footer);
  }


  #renderFilmCardWithPopup(movieData) {
    this.#moviePresenter = new MoviePresenter({
      filmListContainerComponent: this.#filmListContainerComponent.element,
      onDataChange: this.#handleMovieChange,
      onPopupStateChange: this.#handlePopupStateChange,
    });
    this.#moviePresenter.init(movieData);
    this.#moviePresenters.set(movieData.id, this.#moviePresenter);
  }

  #clearFilmList() {
    this.#moviePresenters.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.clear();
    this.#renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    remove(this.#contentComponent);
    remove(this.#showMoreButtonComponent);
  }

  #sortMovies(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#moviesData.sort(sortMovieDateDown);
        break;
      case SortType.RATING:
        this.#moviesData.sort(sortMovieRatingDown);
        break;
      default:
        this.#moviesData = [...this.#sourcedMoviesData];
    }

    this.#currentSortType = sortType;
  }

  #HandleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#moviesData
      .slice(this.#renderedFilmCardCount, this.#renderedFilmCardCount + FILM_CARD_COUNT_PER_STEP)
      .forEach((movieData) => this.#renderFilmCardWithPopup(movieData));

    this.#filmListContainerComponent.element.appendChild(this.#showMoreButtonComponent.element);

    this.#renderedFilmCardCount += FILM_CARD_COUNT_PER_STEP;

    if (this.#renderedFilmCardCount >= this.#moviesData.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleMovieChange = (updatedMovie) => {
    this.#moviesData = updateItem(this.#moviesData, updatedMovie);
    this.#sourcedMoviesData = updateItem(this.#sourcedMoviesData, updatedMovie);
    this.#moviePresenters.get(updatedMovie.id).init(updatedMovie);
  };

  #handlePopupStateChange = () => {
    this.#moviePresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortMovies(sortType);
    this.#clearFilmList();
    this.#renderMainContent();
  };


  init() {
    this.#moviesData = [...this.#moviesModel.moviesData];
    this.#sourcedMoviesData = [...this.#moviesModel.moviesData];

    this.#renderHeaderProfile();
    this.#renderMenu();
    this.#renderSort();
    this.#renderMainContent();
    this.#renderFooterStatistics();
  }
}
