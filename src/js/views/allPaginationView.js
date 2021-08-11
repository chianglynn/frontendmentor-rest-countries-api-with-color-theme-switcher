import PaginationView from "./paginationView";

class AllPaginationView extends PaginationView {
    _parentElement = document.querySelector('.all-pagination');
}

export default new AllPaginationView();