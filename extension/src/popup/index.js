'use strict';

require('angular');

require('./app.scss');

angular
.module( 'app', [
    require('angular-animate'),
    require('angular-touch')
])
.service('StorageItem', require('./services/storageItem.service.js'))
.service('StorageCollection', require('./services/storageCollection.service.js'))
.component('toggle', require('./components/toggle/toggle.component.js'))
.controller('MainController', require('./controllers/main.controller.js'));
