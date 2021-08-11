import ResultsView from "./ResultsView.js";

class AllCountriesView extends ResultsView {
    _parentElement = document.querySelector('.all-countries');
    _errorMessage = 'Data Access Error. Please try again later.';
}

export default new AllCountriesView();