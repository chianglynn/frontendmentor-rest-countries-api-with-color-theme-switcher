import PaginationView from "./paginationView";

class FilterPaginationView extends PaginationView {
    _parentElement = document.querySelector('.filter-pagination');
}

export default new FilterPaginationView();