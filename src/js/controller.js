import * as model from './model.js';
import headerView from './views/headerView.js';
import searchAndFilterView from './views/searchAndFilterView.js';
import allCountriesView from './views/allCountriesView.js';
import searchResultsView from './views/searchResultsView.js';
import filterResultsView from './views/filterResultsView.js';
import countryDetailView from './views/countryDetailView.js';

const searchContainer = document.querySelector('.search-container');
const allCountriesContainer = document.querySelector('.all-countries');
const searchResultsContainer = document.querySelector('.search-results');
const filterResultsContainer = document.querySelector('.filter-results');
const countryIntroductionContainer = document.querySelector('.country-introduction');

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

        [searchContainer, allCountriesContainer, searchResultsContainer, filterResultsContainer].forEach(container => container.classList.add('hidden'));
        countryIntroductionContainer.classList.remove('hidden');

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

        [searchContainer, allCountriesContainer].forEach(container => container.classList.remove('hidden'));
        countryIntroductionContainer.classList.add('hidden');

        allCountriesView.renderSpinner();
        await model.loadAllCountries();
        allCountriesView.render(model.state.allCountries);
    } catch (err) {
        allCountriesView.renderError();
    }
}

const controlSearchResults = async function () {
    try {
        const query = searchAndFilterView.getQuery();
        if (!query) return;

        [allCountriesContainer, filterResultsContainer].forEach(container => container.classList.add('hidden'));
        searchResultsContainer.classList.remove('hidden');

        searchResultsView.renderSpinner();
        await model.loadSearchResults(query);
        searchResultsView.render(model.state.search.results);
    } catch (err) {
        searchResultsView.renderError();
    }
};

const controlFilterResults = async function () {
    try {
        const filterValue = searchAndFilterView.getFilterValue();
        if (!filterValue) return;

        [allCountriesContainer, searchResultsContainer].forEach(container => container.classList.add('hidden'));
        filterResultsContainer.classList.remove('hidden');

        filterResultsView.renderSpinner();
        await model.loadFilterResults(filterValue);
        filterResultsView.render(model.state.filter.results);
    } catch (err) {
        filterResultsView.renderError();
    }
};

const init = function () {
    controlAllCountries();
    headerView.addHandlerColorScheme(controlColorScheme);
    searchAndFilterView.addHandlerSearch(controlSearchResults);
    searchAndFilterView.addHandlerFilter(controlFilterResults);
    countryDetailView.addHandlerRender(controlCountry);
    countryDetailView.addHandlerReturnPage(controlAllCountries);
};

init();