const iso6391 = require('iso-639-1');

function getArrayNames(isoCodes) {

  return isoCodes.map((isoCode) => iso6391.getName(isoCode));
}

function getArrayNativeNames(isoCodes) {

  return isoCodes.map((isoCode) => iso6391.getNativeName(isoCode));
}

function getObjectNames(isoCodes) {

  return isoCodes.map((isoCode) => ({ IsoCode: isoCode, Name: iso6391.getName(isoCode) }) );
}

function getObjectNativeNames(isoCodes) {

  return isoCodes.map((isoCode) => ({ IsoCode: isoCode, Name: iso6391.getNativeName(isoCode) }) );
}

module.exports = {
     getArrayNames,
     getArrayNativeNames,
     getObjectNames,
     getObjectNativeNames
};

