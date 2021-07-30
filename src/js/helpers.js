export const numberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getJSON = async function (url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) throw new Error(`${data.message}(${response.status})`);

        return data;
    } catch (err) {
        throw err;
    }
}