'use strict';

// DEPENDENCIES
window.$ = window.jQuery = require('jquery');
require('lodash');

/**
 * EmojiPopupController
 */
var EmojiPopupController = function () {
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
    this.searchState = null;
};

EmojiPopupController.prototype.create = function (e) {
    this.searchState = _.extend({}, this.defaultSearchState);
    this.bindEvents();
};

EmojiPopupController.prototype.destroy = function (e) {
   this.reset();
   this.unbindEvents();
};

EmojiPopupController.prototype.reset = function () {
    this.hideEmojiPopup();
    this.searchState = _.extend({}, this.defaultSearchState);
};

EmojiPopupController.prototype.bindEvents = function (e) {
    $('body').on('keyup.' + this.NAMESPACE, 'input:text, textarea', this.onKeyup.bind(this));
};

EmojiPopupController.prototype.unbindEvents = function (e) {
    $('body').off('keyup.' + this.NAMESPACE);
};

EmojiPopupController.prototype.onKeyup = function (e) {
    var isValidChar = this.VALID_CHAR_REGEX.test(e.key);

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

EmojiPopupController.prototype.getSearchStr = function (origStr, cursorPos) {
    var strParts = origStr.slice(0, cursorPos).split(' ');
    var lastWord = strParts[strParts.length - 1];
    var isValidEmojiStr = this.VALID_EMOJI_NAME_REGEX.test(lastWord);

    return (isValidEmojiStr) ? lastWord : null;
};

EmojiPopupController.prototype.hideEmojiPopup = function () {
    if (this.$popup === null || this.$popup.length === 0) {
        return;
    }

    this.$popup.remove();
    this.$popup = null;
};

EmojiPopupController.prototype.showEmojiPopup = function () {
    if (this.$popup === null) {
        this.$popup = $('<div class="emoji-popup"></div>').insertAfter(this.searchState.$input);
    }

    this.$popup.html(this.searchState.query);
};

module.exports = EmojiPopupController;
