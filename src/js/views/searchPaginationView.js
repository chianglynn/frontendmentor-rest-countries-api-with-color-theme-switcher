import PaginationView from "./PaginationView.js";

class SearchPaginationView extends PaginationView {
    _parentElement = document.querySelector('.search-pagination');
}

export default new SearchPaginationView();