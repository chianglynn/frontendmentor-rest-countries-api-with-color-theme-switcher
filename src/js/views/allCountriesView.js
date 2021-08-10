import HomePageView from "./homePageView.js";

class AllCountriesView extends HomePageView {
    _parentElement = document.querySelector('.all-countries');
    _errorMessage = 'Data Access Error. Please try again later.';
}

export default new AllCountriesView();