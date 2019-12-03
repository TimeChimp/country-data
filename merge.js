const fs = require("fs");

const files = {
    currency: require("./countries-complete.json"),
    countries: require("./countries.json"),
};

const countries = JSON.parse(JSON.stringify(files.countries));
const countriesCurrencies = JSON.parse(JSON.stringify(files.currency));

// const mergeArr = [];

// merge the same countryCode
const mergeArr = countries.map(country => {
    const id = country.countryCode;

    const currency = countriesCurrencies[id];

    if (currency) {
        country.currency = currency.currency
    }

    return country;
});

fs.writeFileSync("./countries.json", JSON.stringify(mergeArr));

console.log('Complete!');


