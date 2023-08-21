const fs = require('fs');
const path = require('path');

const modules = {};
const utilsPath = path.join(__dirname, 'utils');
const extension = '.js'

// populate the modules to export sourcing the content of the directory (./utils/*.js)
fs.readdirSync(utilsPath)
  .filter((file) => file.endsWith(extension))
  .forEach((file) => {
    const moduleName = path.basename(file, extension);
    modules[moduleName] = require(path.join(utilsPath, file));
  });

module.exports = modules;
