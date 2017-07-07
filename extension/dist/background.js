/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 61);
/******/ })
/************************************************************************/
/******/ ({

/***/ 61:
/***/ (function(module, exports) {

var toggle = {
	key: 'isEnabled',
	defaultState: true,
	get: function( cb ){
		chrome.storage.sync.get(toggle.key, function( data ){
			var state = data[toggle.key];
			if( typeof state === 'undefined' ){
				state = toggle.defaultState;
			}
			cb( state );
		});
	},
	set: function( value, cb ){
		var key = toggle.key;
		var storage = {};
		storage[key] = value;

		chrome.storage.sync.set(storage, function(){
			if( chrome.runtime.lastError ){
				throw Error(chrome.runtime.lastError);
			} else {
				cb();
			}
		});
	}
};

var icon = {
	paths: {
		on: 'icons/icon-on.19.png',
		off: 'icons/icon-off.19.png'
	},
	set: function( state ){
		var type = ( state ) ? 'on' : 'off';
		chrome.browserAction.setIcon({ path: icon.paths[type] });
	}
};

var events = {
	init: function(){
		toggle.get( icon.set );
		// chrome.browserAction.onClicked.addListener( events.onClick );
		chrome.runtime.onInstalled.addListener( events.onInstall );
		chrome.storage.onChanged.addListener( events.onStorageChange );
	},
	onInstall: function( details ){
		if( details.reason === 'install' ){
			if (chrome.runtime.openOptionsPage) {
				chrome.runtime.openOptionsPage();
			} else {
				window.open(chrome.runtime.getURL('options/index.html'));
			}
		}
	},
	onClick: function ( tab ) {
		toggle.get(function( state ){
			toggle.set(!state, function(){
				icon.set( !state );
			});
		});
	},
	onStorageChange: function(changes, namespace) {
		for( var key in changes ){
			var storageData = changes[key];

			if( key === 'isEnabled' ){
				icon.set( storageData.newValue );
			}
		}
	}
};

events.init();


/***/ })

/******/ });