import * as model from './model.js';
import headerView from './views/headerView.js';
import searchAndFilterView from './views/searchAndFilterView.js';
import homePageView from './views/homePageView.js';
import countryDetailView from './views/countryDetailView.js';

const controlColorScheme = function () {
    const colorScheme = headerView.getColorScheme();
    const themes = document.querySelectorAll('.theme');
    const html = document.firstElementChild;
    themes.forEach(theme => theme.classList.toggle('hidden'));
    html.setAttribute('color-scheme', colorScheme);
};

const controlCountry = async function () {
    try {
        const countryName = window.location.hash.slice(1);
        if (!countryName) return;

        const searchContainer = document.querySelector('.search-container');
        searchContainer.classList.add('hidden');

        countryDetailView.renderSpinner();
        await model.loadCountryByName(countryName);
        countryDetailView.render(model.state.country);
    } catch (err) {
        countryDetailView.renderError();
    }
};

const controlAllCountries = async function () {
    try {
        window.location.hash = '';

        const searchContainer = document.querySelector('.search-container');
        searchContainer.classList.remove('hidden');

        homePageView.renderSpinner();
        await model.loadAllCountries();
        homePageView.render(model.state.allCountries);
    } catch (err) {
        homePageView.renderError();
    }
}

const controlSearchResults = async function () {
    try {
        const query = searchAndFilterView.getQuery();
        if (!query) return;

        homePageView.renderSpinner();
        await model.loadSearchResults(query);
        homePageView.render(model.state.search.results);
    } catch (err) {
        homePageView.renderError('No countries found for your query.');
    }
};

const controlFilterResults = async function () {
    try {
        const filterValue = searchAndFilterView.getFilterValue();
        if (!filterValue) return;

        homePageView.renderSpinner();
        await model.loadFilterResults(filterValue);
        homePageView.render(model.state.filter.results);
    } catch (err) {
        homePageView.renderError();
    }
};

const init = function () {
    controlAllCountries();
    headerView.addHandlerColorScheme(controlColorScheme);
    searchAndFilterView.addHandlerSearch(controlSearchResults);
    searchAndFilterView.addHandlerFilter(controlFilterResults);
    homePageView.addHandlerShowDetails(controlCountry);
    countryDetailView.addHandlerRender(controlCountry);
    countryDetailView.addHandlerReturnPage(controlAllCountries);
};

init();