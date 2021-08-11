class SearchAndFilterView {
    _parentElement = document.querySelector('.search-container');

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }

    addHandlerFilter(handler) {
        this._parentElement.addEventListener('change', handler);
    }

    getQuery() {
        const query = this._parentElement.querySelector('.search-input').value;
        this._clearInput();
        this._clearFilter();
        return query;
    }

    getFilterValue() {
        const filterValue = this._parentElement.querySelector('.region-filter').value;
        return filterValue;
    }

    _clearInput() {
        this._parentElement.querySelector('.search-input').value = '';
    }

    _clearFilter() {
        this._parentElement.querySelector('.region-filter').value = '';
    }
}

export default new SearchAndFilterView();