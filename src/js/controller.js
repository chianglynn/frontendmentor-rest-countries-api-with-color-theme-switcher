import * as model from './model.js';
import headerView from './views/headerView.js';
import searchAndFilterView from './views/searchAndFilterView.js';
import allCountriesView from './views/allCountriesView.js';
import searchResultsView from './views/searchResultsView.js';
import filterResultsView from './views/filterResultsView.js';
import allPaginationView from './views/allPaginationView.js';
import searchPaginationView from './views/searchPaginationView.js';
import filterPaginationView from './views/filterPaginationView.js';
import countryDetailView from './views/countryDetailView.js';

// Variables
const searchContainer = document.querySelector('.search-container');
const allCountriesContainer = document.querySelector('.all-countries');
const searchResultsContainer = document.querySelector('.search-results');
const filterResultsContainer = document.querySelector('.filter-results');
const paginationsContainer = document.querySelector('.paginations');
const allPaginationContainer = document.querySelector('.all-pagination');
const searchPaginationContainer = document.querySelector('.search-pagination');
const filterPaginationContainer = document.querySelector('.filter-pagination');
const countryIntroductionContainer = document.querySelector('.country-introduction');

// Functions
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

        [searchContainer, allCountriesContainer, searchResultsContainer, filterResultsContainer, paginationsContainer, allPaginationContainer, searchPaginationContainer, filterPaginationContainer].forEach(container => container.classList.add('hidden'));
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

        [searchPaginationContainer, filterPaginationContainer, countryIntroductionContainer].forEach(container => container.classList.add('hidden'));
        [searchContainer, allCountriesContainer, allPaginationContainer].forEach(container => container.classList.remove('hidden'));

        allCountriesView.renderSpinner();
        await model.loadAllCountries();
        allCountriesView.render(model.getAllCountriesResultsPage());
        allPaginationView.render(model.state.allCountries);
        updateCurrentPage(model.state.allCountries);
    } catch (err) {
        allCountriesView.renderError();
    }
}

const controlSearchResults = async function () {
    try {
        const query = searchAndFilterView.getQuery();
        if (!query) return;

        [allCountriesContainer, filterResultsContainer, allPaginationContainer, filterPaginationContainer, countryIntroductionContainer].forEach(container => container.classList.add('hidden'));
        [searchResultsContainer, searchPaginationContainer].forEach(container => container.classList.remove('hidden'));

        searchResultsView.renderSpinner();
        await model.loadSearchResults(query);
        searchResultsView.render(model.getSearchResultsPage());
        searchPaginationView.render(model.state.search);
        updateCurrentPage(model.state.search);
    } catch (err) {
        searchResultsView.renderError();
    }
};

const controlFilterResults = async function () {
    try {
        const filterValue = searchAndFilterView.getFilterValue();
        if (!filterValue) return;

        [allCountriesContainer, searchResultsContainer, allPaginationContainer, searchPaginationContainer].forEach(container => container.classList.add('hidden'));
        [filterResultsContainer, filterPaginationContainer].forEach(container => container.classList.remove('hidden'));

        filterResultsView.renderSpinner();
        await model.loadFilterResults(filterValue);
        filterResultsView.render(model.getFilterResultsPage());
        filterPaginationView.render(model.state.filter);
        updateCurrentPage(model.state.filter);
    } catch (err) {
        filterResultsView.renderError();
    }
};

const controlAllCountriesPagination = function (page) {
    allCountriesView.render(model.getAllCountriesResultsPage(page));
    allPaginationView.render(model.state.allCountries);
    updateCurrentPage(model.state.allCountries);
};

const controlSearchPagination = function (page) {
    searchResultsView.render(model.getSearchResultsPage(page));
    searchPaginationView.render(model.state.search);
    updateCurrentPage(model.state.search);
};

const controlFilterPagination = function (page) {
    filterResultsView.render(model.getFilterResultsPage(page));
    filterPaginationView.render(model.state.filter);
    updateCurrentPage(model.state.filter);
};

const updateCurrentPage = function (state) {
    document.querySelectorAll('.page-number').forEach(page => {
        page.classList.remove('current-page');
        if (+page.dataset.page === state.page) page.classList.add('current-page');
    });
};

const init = function () {
    controlAllCountries();
    headerView.addHandlerColorScheme(controlColorScheme);
    searchAndFilterView.addHandlerSearch(controlSearchResults);
    searchAndFilterView.addHandlerFilter(controlFilterResults);
    allPaginationView.addHandlerClick(controlAllCountriesPagination);
    searchPaginationView.addHandlerClick(controlSearchPagination);
    filterPaginationView.addHandlerClick(controlFilterPagination);
    countryDetailView.addHandlerRender(controlCountry);
    countryDetailView.addHandlerReturnPage(controlAllCountries);
};

// On load
init();