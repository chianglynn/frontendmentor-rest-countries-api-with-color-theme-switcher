import { API_URL_COUNTRY, API_URL_CODE, API_URL_REGION, API_URL_ALLCOUNTRIES, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    country: {},
    search: {
        query: '',
        results: [],
        page: 1, // default
        resultsPerPage: RESULTS_PER_PAGE,
    },
    filter: {
        region: '',
        results: [],
        page: 1, // default
        resultsPerPage: RESULTS_PER_PAGE,
    },
    allCountries: {
        results: [],
        page: 1, // default
        resultsPerPage: RESULTS_PER_PAGE,
    },
};

export const loadCountryByName = async function (countryName) {
    try {
        const data = await getJSON(`${API_URL_COUNTRY}${countryName}`);
        const country = data[0];
        const borderCountries = await Promise.all(country.borders.map(alpha3Code => loadCountryNameByCode(alpha3Code)));

        state.country = {
            name: country.name.official,
            flag: country.flags.svg,
            nativeName: Object.values(Object.values(country.name)[2])[0].official,
            population: country.population,
            region: country.region,
            subregion: country.subregion,
            capital: country.capital[0],
            topLevelDomain: country.tld[0],
            currencies: country.currencies,
            languages: country.languages,
            borderCountries,
        };
    } catch (err) {
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL_COUNTRY}${query}`);
        state.search.results = data.map(country => {
            return {
                name: country.name.official,
                flag: country.flags.svg,
                population: country.population,
                region: country.region,
                capital: country.capital[0],
            };
        });
    } catch (err) {
        throw err;
    }
};

export const loadFilterResults = async function (region) {
    try {
        state.filter.region = region;
        const data = await getJSON(`${API_URL_REGION}${region}`);
        state.filter.results = data.map(country => {
            return {
                name: country.name.official,
                flag: country.flags.svg,
                population: country.population,
                region: country.region,
                capital: country.capital[0],
            };
        });
    } catch (err) {
        throw err;
    }
};

export const loadAllCountries = async function () {
    try {
        const data = await getJSON(API_URL_ALLCOUNTRIES);

        state.allCountries.results = data.map(country => {
            return {
                name: country.name.official,
                flag: country.flags.svg,
                population: country.population,
                region: country.region,
                capital: country.capital,
            };
        });
    } catch (err) {
        throw err;
    }
};

const loadCountryNameByCode = async function (alpha3Code) {
    const data = await getJSON(`${API_URL_CODE}${alpha3Code}`);
    const countryName = data[0].name.common;
    return countryName;
};

export const getAllCountriesResultsPage = function (page = state.allCountries.page) {
    state.allCountries.page = page;

    const start = (page - 1) * state.allCountries.resultsPerPage; // 0
    const end = page * state.allCountries.resultsPerPage; // 19
    return state.allCountries.results.slice(start, end);
};

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage; // 0
    const end = page * state.search.resultsPerPage; // 19
    return state.search.results.slice(start, end);
};

export const getFilterResultsPage = function (page = state.filter.page) {
    state.filter.page = page;

    const start = (page - 1) * state.filter.resultsPerPage; // 0
    const end = page * state.filter.resultsPerPage; // 19
    return state.filter.results.slice(start, end);
};