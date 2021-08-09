export default class View {
    _data;

    renderSpinner() {
        const markup = `
            <div class="loader">
                <div class="spinner"></div>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage) {
        const markup = this._generateError(message);
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    render(data) {
        if (!data || Array.isArray(data) && data.length === 0) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }
}