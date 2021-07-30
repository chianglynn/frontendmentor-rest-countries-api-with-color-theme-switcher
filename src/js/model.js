import { API_URL_COUNTRY } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    country: {},
};

export const loadCountry = async function (countryName) {
    try {
        const data = await getJSON(`${API_URL_COUNTRY}/${countryName}`);
        const country = data[0];
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
            borderCountries: country.borders,
        };
    } catch (err) {
        console.err(err);
    }
};