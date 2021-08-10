import View from './View.js';
import { numberWithCommas } from '../helpers.js';

class HomePageView extends View {
    _parentElement = document.querySelector('.container');
    _data;
    _errorMessage = 'Data Access Error. Please try again later.';

    addHandlerShowDetails(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const card = e.target.closest('.country-card-link');
            if (!card) return;
            handler();
        });
    }

    _generateMarkup() {
        return `
            <div class="country-card-container">
                ${this._data.map(this._generateCountryCard).join('')}
            </div>
        `;
    }

    _generateCountryCard(country) {
        return `
            <div class="country-card">
                <a href="#${country.name}" class="country-card-link" >
                    <div class="country-flag">
                        <img src="${country.flag}"
                            alt="${country.name}">
                    </div>
                    <div class="card-information">
                        <h2>${country.name}</h2>
                        <ul class="information-list">
                            <li><strong>Population: </strong>${numberWithCommas(country.population)}</li>
                            <li><strong>Region: </strong>${country.region}</li>
                            <li><strong>Capital: </strong>${country.capital}</li>
                        </ul>
                    </div>
                </a>
            </div>
        `;
    }

    _generateError(message) {
        return `
            <div class="error">
                <p>${message}</p>
            </div>
        `;
    }
}

export default new HomePageView();