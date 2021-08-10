import HomePageView from "./homePageView.js";

class SearchResultsView extends HomePageView {
    _parentElement = document.querySelector('.search-results');
    _data;
    _errorMessage = 'No countries found for your query.';
}

export default new SearchResultsView();