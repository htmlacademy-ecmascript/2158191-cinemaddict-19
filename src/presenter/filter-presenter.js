import { render, remove, replace } from '../framework/render';
import MenuView from '../view/menu-view.js';
import {filters} from '../utils/filter.js';
import {FilterType, UpdateType} from '../const.js';


export default class FilterPresenter {
  #filterComponent = null;
  #mainContainer = null;
  #filterModel = null;
  #moviesModel = null;


  constructor({mainContainer, moviesModel, filterModel}) {
    this.#mainContainer = mainContainer;
    this.#filterModel = filterModel;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const moviesData = this.#moviesModel.moviesData;

    return [
      {
        type: FilterType.ALL,
        name: 'All',
        count: filters[FilterType.ALL](moviesData).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filters[FilterType.WATCHLIST](moviesData).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filters[FilterType.HISTORY](moviesData).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filters[FilterType.FAVORITES](moviesData).length,
      },
    ];
  }

  init () {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new MenuView({
      filters: this.filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#mainContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MINOR, filterType);
  };
}
