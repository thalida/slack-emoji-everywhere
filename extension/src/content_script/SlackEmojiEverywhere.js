'use strict';

// DEPENDENCIES
var EmojiPopupController = require('./EmojiPopupController.js');

var SlackEmojiEverywhere = function(){
    this.emojiPopupController = new EmojiPopupController();
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
        this.emojiPopupController.destroy();
    },

    run: function( isEnabled ){
        if( isEnabled !== true ){
            return;
        }

        this.emojiPopupController.create();
    },

    onStorageChange: function(changes, namespace) {
        for( var key in changes ){
            var storageData = changes[key];

            if( key === 'isEnabled' ){
                if( storageData.newValue === true ){
                    this.run(true);
                } else {
                    this.reset();
                }
            }
        }
    }
};

module.exports = SlackEmojiEverywhere;
