import View from './View.js';
import { numberWithCommas } from '../helpers.js';

class CountryDetailView extends View {
    _parentElement = document.querySelector('.container');
    _data;
    _errorMessage = 'Data Access Error. Please try again later.';

    addHandlerRender(handler) {
        ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, handler));
    }

    addHandlerReturnPage(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const backButton = e.target.closest('.back-button');
            if (!backButton) return;
            handler();
        });
    }

    _generateMarkup() {
        return `
            <div class="country-introduction">
                <button class="back-button">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back</span>
                </button>
                <div class="information-section">
                    <div class="country-flag">
                        <img src=${this._data.flag}
                            alt=${this._data.name}>
                    </div>
                    <div class="detail-information">
                        <h1>${this._data.name}</h1>
                        <div class="information-container">
                            <ul class="geography-information">
                                <li><strong>Native Name: </strong>${this._data.nativeName}</li>
                                <li><strong>Population: </strong>${numberWithCommas(this._data.population)}</li>
                                <li><strong>Region: </strong>${this._data.region}</li>
                                <li><strong>Sub Region: </strong>${this._data.subregion}</li>
                                <li><strong>Capital: </strong>${this._data.capital}</li>
                            </ul>
                            <ul class="other-information">
                                <li><strong>Top Level Domain: </strong>${this._data.topLevelDomain.toString()}</li>
                                <li><strong>Currencies: </strong>${this._data.currencies.map(currency => currency.name).join(', ')}</li>
                                <li><strong>Language: </strong>${this._data.languages.map(language => language.name).join(', ')}</li>
                            </ul>
                        </div>
                        <div class="border-countries">
                            <h3>Border Countries:</h3>
                            <ul class="countries">
                            ${this._data.borderCountries.length === 0 ? 'None' : this._data.borderCountries.map(border => `<li>${border}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
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

export default new CountryDetailView();