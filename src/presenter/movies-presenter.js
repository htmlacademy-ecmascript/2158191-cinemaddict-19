import ShowMoreButtonView from '../view/button-show-more-view.js';
import SortView from '../view/sort-view.js';
import ContentView from '../view/content-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmListContainerView from '../view/film-list-container.js';
import FilmListView from '../view/film-list-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import MenuView from '../view/menu-view.js';
import ProfileRatingView from '../view/profile-rating-view.js';
import { render } from '../framework/render.js';
import PopupView from '../view/popup-view.js';

const HEADER_TEXT = {
  noMovies: 'There are no movies in our database',
  noFavoirte: 'There are no favorite movies now',
  noHistory: 'There are no watched movies now',
  noWatchList: 'There are no movies to watch now',
};
const FILM_CARD_COUNT_PER_STEP = 5;

export default class MoviesPresenter {
  #mainContainer = null;
  #headerProfile = null;
  #footer = null;
  #moviesModel = null;
  #body = null;
  #moviesData = null;
  #renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;

  #filmListComponent = null;
  #filmListContainerComponent = new FilmListContainerView();
  #contentComponent = new ContentView();
  #showMoreButtonComponent = null;


  constructor({headerProfile, mainContainer, footer, body, moviesModel}) {
    this.#mainContainer = mainContainer;
    this.#headerProfile = headerProfile;
    this.#footer = footer;
    this.#moviesModel = moviesModel;
    this.#body = body;
  }

  #renderHeaderProfile() {
    render(new ProfileRatingView(), this.#headerProfile);
  }

  #renderMenuAndSort() {
    render(new MenuView(), this.#mainContainer);
    render(new SortView(), this.#mainContainer);
  }

  #renderMainContent() {
    render(this.#contentComponent, this.#mainContainer);

    if(!this.#moviesData.length) {
      this.#filmListComponent = new FilmListView(HEADER_TEXT.noMovies);

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
      this.#showMoreButtonComponent = new ShowMoreButtonView();

      render(this.#showMoreButtonComponent, this.#filmListContainerComponent.element);

      this.#showMoreButtonComponent.element.addEventListener('click', this.#showMoreButtonClickHandler);
    }
  }

  #renderFooterStatistics() {
    render(new FooterStatisticsView(this.#moviesData.length), this.#footer);
  }


  #renderFilmCardWithPopup(movieData) {
    const filmCard = new FilmCardView(movieData);
    const popup = new PopupView({movieData, commentsData:this.#moviesModel.getComments(movieData.id)}).element;

    const closePopup = () => {
      this.#body.removeChild(popup);
      this.#body.classList.remove('hide-overflow');
    };

    const showPopup = () => {
      this.#body.appendChild(popup);
      this.#body.classList.add('hide-overflow');
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    filmCard.element.querySelector('.film-card__link').addEventListener('click', () => {
      showPopup();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    popup.querySelector('.film-details__close-btn').addEventListener('click',() => {
      closePopup();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(filmCard, this.#filmListContainerComponent.element);
  }

  #showMoreButtonClickHandler = (evt) => {
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

  init() {
    this.#moviesData = [...this.#moviesModel.moviesData];

    this.#renderHeaderProfile();
    this.#renderMenuAndSort();
    this.#renderMainContent();
    this.#renderFooterStatistics();
  }
}
