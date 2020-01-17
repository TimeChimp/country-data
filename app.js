const fs = require("fs");
const arrays = require("./arrays");

const files = {
    currency: require("./countries-complete.json"),
    langDateFormat: require("./country-lang-dateformat.json"),
    allCountries: require("./countries-all.json"),
    twelveHours: arrays.twelveHours,
    decimalPoints: arrays.decimalPoint,
    eu: arrays.eu,
    businessIdNames: arrays.businessIdNames
};

const countriesAll = JSON.parse(JSON.stringify(files.allCountries));
const countriesCurrencies = JSON.parse(JSON.stringify(files.currency));
const countriesLangDate = JSON.parse(JSON.stringify(files.langDateFormat));

const mergeArr = [];

// merge the same countryCode
countriesAll.forEach(country => {
    const id = country.countryCode;
    const result = {
        ...country
    };

    // EU
    const isEu = files.eu.includes(id);
    if (isEu) {
        result.eu = true;
    }

    // Currency
    const currencyObject = countriesCurrencies[id];
    result.currency = currencyObject ? currencyObject.currency : 'USD';

    // DateFormat
    const dateObject = countriesLangDate.find(
        x => x.countryCode === id
    );
    result.dateFormat = dateObject ? dateObject.dateFormat : 'MM/DD/YYYY';

    // Language
    const langObject = countriesLangDate.find(
        x => x.countryCode === id
    );
    result.langCode = langObject ? langObject.langCode : 'en';

    // DistanceFormat
    const distanceObject = countriesLangDate.find(
        x => x.countryCode === id
    );
    result.distanceFormat = distanceObject && distanceObject.distance === 'miles' ? 'mi' : 'km';

    // TimeFormat
    const isTwelve = files.twelveHours.includes(id);
    result.timeFormat = isTwelve ? "h:mma" : "HH:mm";

    // NumberFormat
    const isDecimal = files.decimalPoints.includes(id);
    result.numberFormat = isDecimal ? "comma" : "dot";

    // BusinessIdName
    const idObject = files.businessIdNames.find(
        x => x.id === id
    );
    result.businessIdName = idObject ? idObject.name : 'Business ID';

    mergeArr.push(result);
});

fs.writeFileSync("./countries.json", JSON.stringify(mergeArr));
