import ResultsView from "./ResultsView.js";

class SearchResultsView extends ResultsView {
    _parentElement = document.querySelector('.search-results');
    _errorMessage = 'No countries found for your query.';
}

export default new SearchResultsView();