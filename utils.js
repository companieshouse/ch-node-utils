const fs = require('fs');
const path = require('path');

const modules = {};

// populate the modules to export sourcing the content of the directory (./*.js)
fs.readdirSync(__dirname)
  .filter((file) => file !== 'utils.js' && file.endsWith('.js'))
  .forEach((file) => {
    const moduleName = path.basename(file, '.js');
    modules[moduleName] = require(`./${moduleName}`);
  });

module.exports = modules;
