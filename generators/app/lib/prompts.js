/**
 * Created by rsvalerio on 31/8/16.
 */

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
  },
  {
    type: 'confirm',
    name: 'docker',
    message: 'Dockerize the app?',
    default: true
  }
];
