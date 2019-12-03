const fs = require("fs");
const arrays = require("./arrays");

const files = {
    currency: require("./country-currency.json"),
    langDateFormat: require("./country-lang-dateformat.json"),
    allCountries: require("./countries-all.json"),
    twelveHours: arrays.twelveHours,
    decimalPoints: arrays.decimalPoint
};

const countriesAll = JSON.parse(JSON.stringify(files.allCountries));
const countriesCurrencies = JSON.parse(JSON.stringify(files.currency));
const countriesLangDate = JSON.parse(JSON.stringify(files.langDateFormat));

const mergeArr = [];

// merge the same countryCode
countriesCurrencies.forEach(currency => {
    const equalObj = countriesLangDate.find(
        x => x.countryCode === currency.countryCode
    );

    if (equalObj) {
        let newObj = {};

        if (files.twelveHours.includes(currency.id)) {
            if (files.decimalPoints.includes(currency.id)) {
                newObj = {
                    ...currency,
                    ...equalObj,
                    timeFormat: "12-hour",
                    numberFormat: "comma"
                };
            } else {
                newObj = {
                    ...currency,
                    ...equalObj,
                    timeFormat: "12-hour",
                    numberFormat: "dot"
                };
            }
        } else {
            newObj = {
                ...currency,
                ...equalObj,
                timeFormat: "24-hour",
                numberFormat: "dot"
            };
        }

        mergeArr.push(newObj);
    }
});

fs.writeFileSync("./countries.json", JSON.stringify(mergeArr));

// extract countries with no data
const countriesNoData = [];

countriesAll.forEach(country => {
    const equalObj = countriesLangDate.find(
        x => x.countryCode === country.countryCode
    );

    if (!equalObj) {
        countriesNoData.push(country);
    }
});

fs.writeFileSync("./countries-no-data.json", JSON.stringify(countriesNoData));
