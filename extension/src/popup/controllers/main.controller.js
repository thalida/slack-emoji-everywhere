'use strict';

module.exports = function( StorageCollection ){
    "ngInject";

    var $ctrl = this;
    var isProcessing = false;
    var storage = new StorageCollection();

    storage.add({
        key: 'isEnabled',
        defaultTo: true,
        onChange: function( isEnabled ){
            $ctrl.isEnabled = isEnabled;
        }
    });

    $ctrl.onToggleUpdate = function( toggle ){
        storage.set('isEnabled', toggle.newVal);
    };
};
