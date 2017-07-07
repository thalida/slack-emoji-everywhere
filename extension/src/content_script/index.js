'use strict';

// DEPENDENCIES
window.$ = window.jQuery = require('jquery');
require('lodash');

/**
 * EmojiController
 */
var EmojiController = function () {
    this.NAMESPACE = 'slack-emoji-everywhere';
    this.MIN_SEARCH_CHARS = 3;
    this.VALID_CHAR_REGEX = /^[a-zA-Z0-9\-\:]{1}$/;
    this.VALID_EMOJI_NAME_REGEX = /^:[a-zA-Z0-9\-]+:?$/;
    this.ALLOWED_SPECIAL_CHARS = [
        'backspace'
    ];

    this.$popup = null;
    this.defaultSearchState = {
        $input: null,
        origValue: '',
        cursorPos: -1,
        query: ''
    };

    this.searchState = _.extend({}, this.defaultSearchState);
    
    this.bindEvents();
};

EmojiController.prototype.bindEvents = function (e) {
    $('body').on('keyup.' + this.NAMESPACE, 'input:text, textarea', this.onKeyup.bind(this));
};

EmojiController.prototype.unbindEvents = function (e) {
    $('body').off('keyup.' + this.NAMESPACE);
};

EmojiController.prototype.onKeyup = function (e) {
    var isValidChar = this.VALID_CHAR_REGEX.test(e.key);
    console.log(e.key, isValidChar);

    if (!isValidChar && this.ALLOWED_SPECIAL_CHARS.indexOf(e.key.toLowerCase()) === -1) {
        this.reset(); 
        return;
    }

    var $input = $(e.currentTarget);
    var origValue = $input.val();
    var cursorPos = $input[0].selectionStart;
    var searchStr = this.getSearchStr(origValue, cursorPos);

    if (searchStr === null || searchStr.length < this.MIN_SEARCH_CHARS) {
        this.reset();
        return;
    }

    this.searchState = {
        $input: $input,
        origValue: origValue,
        cursorPos: cursorPos,
        query: searchStr
    };

    this.showEmojiPopup();
};

EmojiController.prototype.getSearchStr = function (origStr, cursorPos) {
    var strParts = origStr.slice(0, cursorPos).split(' ');
    var lastWord = strParts[strParts.length - 1];
    var isValidEmojiStr = this.VALID_EMOJI_NAME_REGEX.test(lastWord);

    return (isValidEmojiStr) ? lastWord : null;
};

EmojiController.prototype.reset = function () {
    this.hideEmojiPopup();
    this.searchState = _.extend({}, this.defaultSearchState);
};

EmojiController.prototype.hideEmojiPopup = function () {
    if (this.$popup === null || this.$popup.length === 0) {
        return;
    }

    this.$popup.remove();
    this.$popup = null;
};

EmojiController.prototype.showEmojiPopup = function () {
    if (this.$popup === null) {
        this.$popup = $('<div class="emoji-popup"></div>').insertAfter(this.searchState.$input);
    }

    this.$popup.html(this.searchState.query);
};

new EmojiController();
