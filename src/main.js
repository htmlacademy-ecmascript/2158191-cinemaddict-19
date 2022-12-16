import MoviesPresenter from './presenter/movies-presenter.js';
import MoviesModel from './model/movies-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');
const body = document.body;
const moviesModel = new MoviesModel('0');
const mainPagePresenter = new MoviesPresenter({headerProfile: siteHeaderElement, mainContainer: siteMainElement, footer: siteFooterElement, moviesModel: moviesModel, body});


mainPagePresenter.init();

