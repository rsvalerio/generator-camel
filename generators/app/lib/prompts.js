'use strict';
var path = require('path');
var pkg = require(path.join(__dirname, '../', '../', '../', 'package.json'));
var appName = pkg.name;

module.exports = [
  {
    type: 'input',
    name: 'appName',
    message: 'App name: ',
    default: appName
  }, {
    type: 'input',
    name: 'package',
    message: 'Package name: ',
    default: 'com.' + appName
  }
];
