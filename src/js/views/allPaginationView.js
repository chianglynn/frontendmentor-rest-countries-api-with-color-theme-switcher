import PaginationView from "./PaginationView.js";

class AllPaginationView extends PaginationView {
    _parentElement = document.querySelector('.all-pagination');
}

export default new AllPaginationView();