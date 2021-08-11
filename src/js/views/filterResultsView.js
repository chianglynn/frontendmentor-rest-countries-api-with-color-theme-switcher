import ResultsView from "./ResultsView.js";

class FilterResultsView extends ResultsView {
    _parentElement = document.querySelector('.filter-results');
    _errorMessage = 'Data Access Error. Please try again later.';
}

export default new FilterResultsView();