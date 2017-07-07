'use strict';

// DEPENDENCIES
window.$ = window.jQuery = require('jquery');
require('lodash');

var EmojiController = require('./EmojiController.js');

var SlackEmojiEverywhere = function(){
    this.isProcessing = false;
    this.emojiController = new EmojiController();
    this.getStorage('isEnabled', this.run.bind(this));
    chrome.storage.onChanged.addListener( this.onStorageChange.bind(this) );
};

SlackEmojiEverywhere.prototype = {
    getStorage: function( key, cb ){
        chrome.storage.sync.get(key, function( data ){
            return cb( data[key] );
        });
    },

    reset: function(){
        if( this.isProcessing === true ){
            return;
        }

        this.isProcessing = true;
        this.emojiController.destroy();
        this.isProcessing = false;
    },

    run: function( isEnabled ){
        if( isEnabled !== true ){
            this.isProcessing = false;
            return;
        }

        if (this.isProcessing === true) {
            return;
        }

        this.isProcessing = true;
        this.emojiController.create();
        this.isProcessing = false;
    },

    onStorageChange: function(changes, namespace) {
        for( var key in changes ){
            var storageData = changes[key];

            if( key === 'isEnabled' ){
                if( storageData.newValue === true ){
                    this.run(storageData.newValue);
                } else {
                    this.reset(storageData.newValue);
                }
            }
        }
    }
};

new SlackEmojiEverywhere();
