'use strict';

// Vendors
require('lodash');
require('angular');

// Polyfills
require('./helpers/polyfill-object-keys.js');

// Helpers
global.requireUtils = require('./helpers/require-utils.js');

console.log('popup')

// App
require('./app.scss');
require('./app.module.js');

require('./services');
require('./components');
require('./views');

angular.module('app').constant('isPopup', true);
