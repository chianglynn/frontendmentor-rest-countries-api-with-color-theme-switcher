import View from './View.js';

class SearchPaginationView extends View {
    _parentElement = document.querySelector('.search-pagination');
    _data;

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const link = e.target.closest('.page-link');
            if (!link) return;

            const page = +link.dataset.page;
            handler(page);
        });
    }

    _generateMarkup() {
        const currentPage = this._data.page;
        const totalPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        let markup = '';
        let i = 0;

        if (currentPage !== 1) {
            markup += `
            <a href="javascript:;" class="page-link prev-page" data-page="${currentPage - 1}">
                <i class="fas fa-arrow-left"></i>
                <span>Page ${currentPage - 1}</sapn>
            </a>
        `;
        }
        if (totalPages <= 10) {
            for (i = 0; i < totalPages; i++) {
                markup += `
                <a href="javascript:;" class="page-link page-number page-desktop" data-page="${i + 1}">${i + 1}</a>
            `;
            }
        }

        if (totalPages > 10) {
            if (currentPage <= 6) {
                for (i = 0; i < 10; i++) {
                    markup += `
                <a href="javascript:;" class="page-link page-number page-desktop" data-page="${i + 1}">${i + 1}</a>
            `;
                }
            }
            if (currentPage > 6 && currentPage <= totalPages - 4) {
                for (i = currentPage - 6; i < currentPage + 4; i++) {
                    markup += `
                    <a href="javascript:;" class="page-link page-number page-desktop" data-page="${i + 1}">${i + 1}</a>
                `;
                }
            }
            if (currentPage > totalPages - 4) {
                for (i = totalPages - 10; i < totalPages; i++) {
                    markup += `
                    <a href="javascript:;" class="page-link page-number page-desktop" data-page="${i + 1}">${i + 1}</a>
                `;
                }
            }
        }

        if (currentPage !== totalPages) {
            markup += `
                <a href="javascript:;" class="page-link next-page" data-page="${currentPage + 1}">
                    <span>Page ${currentPage + 1}</sapn>
                    <i class="fas fa-arrow-right"></i>
                </a>
            `;
        }

        return markup;
    }
}

export default new SearchPaginationView();