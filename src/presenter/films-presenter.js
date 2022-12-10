import ShowMoreButtonView from '../view/button-show-more-view.js';
import SortView from '../view/sort-view.js';
import ContentView from '../view/content-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmListContainerView from '../view/film-list-container.js';
import FilmListView from '../view/film-list-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import MenuView from '../view/menu-view.js';
import ProfileRatingView from '../view/profile-rating-view.js';
import {render} from '../render.js';

export default class FilmsPresenter {
  filmListComponent = new FilmListView();
  filmListContainerComponent = new FilmListContainerView();
  contentComponent = new ContentView();
  constructor(headerProfile, mainContainer, footer) {
    this.mainContainer = mainContainer;
    this.headerProfile = headerProfile;
    this.footer = footer;
  }

  init() {
    render(new ProfileRatingView(), this.headerProfile);
    render(new MenuView(), this.mainContainer);
    render(new SortView(), this.mainContainer);
    render(this.contentComponent, this.mainContainer);
    render(this.filmListComponent, this.contentComponent.getElement());
    render(this.filmListContainerComponent, this.filmListComponent.getElement());
    render(new FooterStatisticsView(), this.footer);

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmListContainerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmListContainerComponent.getElement());
  }
}
