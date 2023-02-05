import CinemaPresenter from './presenter/cinema-presenter.js';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import MoviesApiService from './movies-api-service.js';
import CommentsApiService from './comments-api-service.js';


const AUTHORIZATION = 'Basic fdfdgfgsa2j';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');
const moviesModel = new MoviesModel({moviesApiService: new MoviesApiService(END_POINT, AUTHORIZATION)});
const commentsModel = new CommentsModel({moviesModel, commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();
const cinemaPresenter = new CinemaPresenter({headerProfile: siteHeaderElement, mainContainer: siteMainElement, footer: siteFooterElement, moviesModel, commentsModel, filterModel});

cinemaPresenter.init();

