import { API_URL_COUNTRY, API_URL_CODE, API_URL_REGION, API_URL_ALLCOUNTRIES } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    country: {},
    search: {
        query: '',
        results: [],
    },
    filter: {
        region: '',
        results: [],
    },
    allCountries: {},
};

export const loadCountryByName = async function (countryName) {
    try {
        const data = await getJSON(`${API_URL_COUNTRY}${countryName}`);
        const country = data[0];
        const borderCountries = await Promise.all(country.borders.map(alpha3Code => loadCountryNameByCode(alpha3Code)));

        state.country = {
            name: country.name,
            flag: country.flag,
            nativeName: country.nativeName,
            population: country.population,
            region: country.region,
            subregion: country.subregion,
            capital: country.capital,
            topLevelDomain: country.topLevelDomain,
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
                name: country.name,
                flag: country.flag,
                population: country.population,
                region: country.region,
                capital: country.capital,
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
                name: country.name,
                flag: country.flag,
                population: country.population,
                region: country.region,
                capital: country.capital,
            };
        });
    } catch (err) {
        throw err;
    }
};

export const loadAllCountries = async function () {
    try {
        const data = await getJSON(API_URL_ALLCOUNTRIES);
        state.allCountries = data.map(country => {
            return {
                name: country.name,
                flag: country.flag,
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
    const countryName = data.name;
    return countryName;
};