import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      handler();

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    //   Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage, 'next');
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage, 'previous');
    }

    // Other page
    if (curPage < numPages) {
      return this._generateMarkupButton(curPage, 'both');
    }

    //   Page 1, and there are NO other pages
    return '';
  }
  _generateMarkupButton(curP, direction) {
    const next = `
        <button data-goto="${
          curP + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curP + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    const previous = `
        <button data-goto="${
          curP - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curP - 1}</span>
          </button>
      `;
    const both = previous + next;

    if (direction === 'next') return next;
    if (direction === 'previous') return previous;
    return both;
  }
}

export default new PaginationView();
