const pageContainer = document.querySelector('.container');

const renderSpinner = parentElment => {
    const markup = `<div class="loader"></div>`;

    parentElment.innerHTML = '';
    parentElment.insertAdjacentHTML('afterbegin', markup);
};

const showCountry = async function () {
    try {
        renderSpinner(pageContainer);

        // const response = await fetch('https://restcountries.eu/rest/v2/all'); -> const showContries
        const response = await fetch('https://restcountries.eu/rest/v2/name/belgium');
        const data = await response.json();

        if (!response.ok) throw new Error(`${data.message}(${response.status})`);

        let country = data[0];
        country = {
            name: data[0].name,
            flag: data[0].flag,
            nativeName: data[0].nativeName,
            population: data[0].population,
            region: data[0].region,
            subregion: data[0].subregion,
            capital: data[0].capital,
            topLevelDomain: data[0].topLevelDomain,
            currencies: data[0].currencies,
            languages: data[0].languages,
            borderCountries: data[0].borders,
        };

        const markup = `
            <div class="country-introduction">
                <button class="back-button">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back</span>
                </button>
                <div class="information-section">
                    <div class="country-flag">
                        <img src=${country.flag}
                            alt=${country.name}>
                    </div>
                    <div class="detail-information">
                        <h1>${country.name}</h1>
                        <div class="information-container">
                            <ul class="geography-information">
                                <li><strong>Native Name: </strong>${country.nativeName}</li>
                                <li><strong>Population: </strong>${numberWithCommas(country.population)}</li>
                                <li><strong>Region: </strong>${country.region}</li>
                                <li><strong>Sub Region: </strong>${country.subregion}</li>
                                <li><strong>Capital: </strong>${country.capital}</li>
                            </ul>
                            <ul class="other-information">
                                <li><strong>Top Level Domain: </strong>${country.topLevelDomain.toString()}</li>
                                <li><strong>Currencies: </strong>${country.currencies.map(currency => currency.name).join(', ')}</li>
                                <li><strong>Language: </strong>${country.languages.map(language => language.name).join(', ')}</li>
                            </ul>
                        </div>
                        <div class="border-countries">
                            <h3>Border Countries:</h3>
                            <ul class="countries">
                            ${country.borderCountries.map(border => `<li>${border}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        pageContainer.innerHTML = '';
        pageContainer.insertAdjacentHTML('afterbegin', markup);
    } catch (err) {
        console.error(err);
    }
}

const numberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

showCountry();