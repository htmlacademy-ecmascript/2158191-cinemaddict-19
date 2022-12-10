import FilmPresenter from './presenter/films-presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');
const filmPresenter = new FilmPresenter(siteHeaderElement, siteMainElement, siteFooterElement);

filmPresenter.init();
