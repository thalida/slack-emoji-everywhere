'use strict';

module.exports = function( $urlRouterProvider, $locationProvider ){
    console.log('12345');
    "ngInject";

    $locationProvider.html5Mode( false );
    $urlRouterProvider.otherwise('/');
}
