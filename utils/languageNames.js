
const path    = require('path');
const iso6391 = require('iso-639-1');
const dirs    = require("./subDirs");

function getNamesArray(isoCodes) {

    return isoCodes.map((isoCode) => iso6391.getName(isoCode));
}

function getNativeNamesArray(isoCodes) {

    return isoCodes.map((isoCode) => iso6391.getNativeName(isoCode));
}

function getNamesObjectArray(isoCodes) {

    return isoCodes.map((isoCode) => ({ IsoCode: isoCode, Name: iso6391.getName(isoCode) }) );
}

function getNativeNamesObjectArray(isoCodes) {

    return isoCodes.map((isoCode) => ({ IsoCode: isoCode, Name: iso6391.getNativeName(isoCode) }) );
}

function sourceLocale(serviceName, localeDir = 'locale' ) {

    localePath = path.join(localeDir, serviceName);
    return getNativeNamesObjectArray (dirs.get (localePath));
}

module.exports = {
     getNamesArray,
     getNativeNamesArray,
     getNamesObjectArray,
     getNativeNamesObjectArray,
     sourceLocale
};
