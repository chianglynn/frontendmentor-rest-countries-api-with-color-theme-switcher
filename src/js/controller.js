import * as model from './model.js';
import HomePageView from './views/homePageView.js';
import CountryDetailView from './views/countryDetailView.js';

const controlCountry = async function () {
    try {
        const countryName = window.location.hash.slice(1);
        if (!countryName) return;

        CountryDetailView.renderSpinner();
        await model.loadCountry(countryName);
        CountryDetailView.render(model.state.country);
    } catch (err) {
        CountryDetailView.renderError();
    }
};

const controlHomePage = async function () {
    try {
        window.location.hash = '';
        HomePageView.renderSpinner();
        await model.loadAllCountries();
        HomePageView.render(model.state.allCountries);
    } catch (err) {
        HomePageView.renderError();
    }
}

const init = function () {
    controlHomePage();
    HomePageView.addHandlerShowDetails(controlCountry);
    CountryDetailView.addHandlerRender(controlCountry);
    CountryDetailView.addHandlerReturnPage(controlHomePage);
};

init();