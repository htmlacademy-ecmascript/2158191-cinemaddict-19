import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType) {
  const {type, name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item${type === currentFilterType ? ' main-navigation__item--active' : ''}" ${count === 0 ? 'disabled' : ''} value = "${type}">${name === 'All' ? 'All movies</a>' : `${name}<span class="main-navigation__item-count">${count}</span></a>`}`
  );
}

function createFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      ${filterItemsTemplate}
    </nav>`
  );
}

export default class MenuView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A' && evt.target.tagName !== 'SPAN') {
      return;
    }

    if (evt.target.tagName === 'SPAN') {
      this.#handleFilterTypeChange(evt.target.parentNode.attributes.value.nodeValue);
      return;
    }

    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.attributes.value.nodeValue);
  };
}
