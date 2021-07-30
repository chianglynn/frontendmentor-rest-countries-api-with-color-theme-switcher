import { numberWithCommas } from '../helpers.js';

class countryDetailView {
    #parentElement = document.querySelector('.container');
    #buttonElement = document.querySelector('.back-button');
    #data;

    renderSpinner() {
        const markup = `
            <div class="loader">
                <div class="spinner"></div>
            </div>
        `;
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerRender(handler) {
        ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, handler));
    }

    #generateMarkup() {
        return `
            <div class="country-introduction">
                <button class="back-button">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back</span>
                </button>
                <div class="information-section">
                    <div class="country-flag">
                        <img src=${this.#data.flag}
                            alt=${this.#data.name}>
                    </div>
                    <div class="detail-information">
                        <h1>${this.#data.name}</h1>
                        <div class="information-container">
                            <ul class="geography-information">
                                <li><strong>Native Name: </strong>${this.#data.nativeName}</li>
                                <li><strong>Population: </strong>${numberWithCommas(this.#data.population)}</li>
                                <li><strong>Region: </strong>${this.#data.region}</li>
                                <li><strong>Sub Region: </strong>${this.#data.subregion}</li>
                                <li><strong>Capital: </strong>${this.#data.capital}</li>
                            </ul>
                            <ul class="other-information">
                                <li><strong>Top Level Domain: </strong>${this.#data.topLevelDomain.toString()}</li>
                                <li><strong>Currencies: </strong>${this.#data.currencies.map(currency => currency.name).join(', ')}</li>
                                <li><strong>Language: </strong>${this.#data.languages.map(language => language.name).join(', ')}</li>
                            </ul>
                        </div>
                        <div class="border-countries">
                            <h3>Border Countries:</h3>
                            <ul class="countries">
                            ${this.#data.borderCountries.map(border => `<li>${border}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    #clear() {
        this.#parentElement.innerHTML = '';
    }
}

export default new countryDetailView();