import HomePageView from "./homePageView.js";

class FilterResultsView extends HomePageView {
    _parentElement = document.querySelector('.filter-results');
    _errorMessage = 'Data Access Error. Please try again later.';
}

export default new FilterResultsView();