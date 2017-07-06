'use strict';

window.$ = window.jQuery = require('jquery');

var EmojiControl = function () {
    this.NAMESPACE = '.slack-emoji-everywhere';
    this.MIN_CHARS = 2;
    this.hasColon = false;
    this.search = '';
    
    this.bindEvents();
};

EmojiControl.prototype.bindEvents = function (e) {
    $('body').on('keypress' + this.NAMESPACE, 'input:text', this.onKeypress.bind(this));
};

EmojiControl.prototype.unbindEvents = function (e) {
    $('body').off('keypress' + this.NAMESPACE);
};

EmojiControl.prototype.onKeypress = function (e) {
    if (this.hasColon || e.key === ':') {
        this.hasColon = true;
        this.search += e.key;
        this.displayPopup();
    }
};

EmojiControl.prototype.displayPopup = function () {
    if (this.search.length < this.MIN_CHARS) {
        return;
    }

    console.log('FIND:', this.search);
};

new EmojiControl();
