import CinemaPresenter from './presenter/cinema-presenter.js';
import MoviesModel from './model/movies-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');
const moviesModel = new MoviesModel();
const cinemaPresenter = new CinemaPresenter({headerProfile: siteHeaderElement, mainContainer: siteMainElement, footer: siteFooterElement, moviesModel: moviesModel});

cinemaPresenter.init();

