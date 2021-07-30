import * as model from './model.js';
import countryDetailView from './views/countryDetailView.js';

const controlCountry = async function () {
    try {
        const countryName = window.location.hash.slice(1);
        if (!countryName) return;

        countryDetailView.renderSpinner();

        await model.loadCountry(countryName);

        countryDetailView.render(model.state.country);

    } catch (err) {
        console.error(err);
    }
};

const init = function () {
    countryDetailView.addHandlerRender(controlCountry);
};

init();