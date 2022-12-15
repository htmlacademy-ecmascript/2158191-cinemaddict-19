import FilmPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');
const moviesModel = new MoviesModel();
const filmPresenter = new FilmPresenter({headerProfile: siteHeaderElement, mainContainer: siteMainElement, footer: siteFooterElement, moviesModel});

filmPresenter.init();
