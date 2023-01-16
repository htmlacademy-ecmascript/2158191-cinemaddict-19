import PopupView from '../view/popup-view';
import FilmCardView from '../view/film-card-view.js';
import { render } from '../framework/render';
import MoviesModel from '../model/movies-model';

export default class MoviePresenter {
  #popupComponent = null;
  #filmCardComponent = null;
  #movieData = null;
  #filmListContainerComponent = null;
  #moviesModel = new MoviesModel();

  constructor({movieData, filmListContainerComponent}) {
    this.#movieData = movieData;
    this.#filmListContainerComponent = filmListContainerComponent;

  }


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  init() {
    this.#popupComponent = new PopupView({movieData: this.#movieData, commentsData:this.#moviesModel.getComments(this.#movieData.id), onCloseButtonClick: () => {
      this.#closePopup();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }}).element;

    this.#filmCardComponent = new FilmCardView({movieData: this.#movieData, onFilmCardClick: () => {
      this.#showPopup();
      document.addEventListener('keydown', this.#escKeyDownHandler);
    }});

    render(this.#filmCardComponent, this.#filmListContainerComponent);
  }

  #closePopup() {
    document.body.removeChild(this.#popupComponent);
    document.body.classList.remove('hide-overflow');
  }

  #showPopup() {
    document.body.appendChild(this.#popupComponent);
    document.body.classList.add('hide-overflow');
  }
}
