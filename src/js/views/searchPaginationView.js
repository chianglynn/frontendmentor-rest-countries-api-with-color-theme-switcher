import PaginationView from "./paginationView";

class SearchPaginationView extends PaginationView {
    _parentElement = document.querySelector('.search-pagination');
}

export default new SearchPaginationView();