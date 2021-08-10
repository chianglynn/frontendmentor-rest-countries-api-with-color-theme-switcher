class HeaderView {
    _parentElement = document.querySelector('.header');

    addHandlerColorScheme(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const colorScheme = e.target.closest('.theme');
            if (!colorScheme) return;
            handler();
        });
    }

    getColorScheme() {
        const colorScheme = this._parentElement.querySelector('.hidden').dataset.colorScheme;
        return colorScheme;
    }
}

export default new HeaderView();