'use strict';

require('angular-ui-router');

angular
	.module( 'app', [
	    require('angular-animate'),
	    require('angular-resource'),
	    require('angular-sanitize'),
	    require('angular-touch'),
	    require('angular-messages'),
        'ui.router'
	])
	.config( require('./app.routes.js') );
