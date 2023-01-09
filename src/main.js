import MoviesPresenter from './presenter/movies-presenter.js';
import MoviesModel from './model/movies-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');
const moviesModel = new MoviesModel();
const mainPagePresenter = new MoviesPresenter({headerProfile: siteHeaderElement, mainContainer: siteMainElement, footer: siteFooterElement, moviesModel: moviesModel});

mainPagePresenter.init();

