const iso6391 = require('iso-639-1');

function getNames(isoCodes) {

  return isoCodes.map((isoCode) => iso6391.getName(isoCode));
}

function getNativeNames(isoCodes) {

  return isoCodes.map((isoCode) => iso6391.getNativeName(isoCode));
}

module.exports = {
     getNames,
     getNativeNames
};

