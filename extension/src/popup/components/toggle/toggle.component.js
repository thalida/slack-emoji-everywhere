'use strict';

require('./toggle.scss');
require('./toggle.html');

module.exports = {
	templateUrl: 'popup/components/toggle/toggle.html',
	bindings: {
		onLabel: '@',
		offLabel: '@',
		state: '<',
		changeCB: '&onChange'
	},
	controller: function (){
		var $ctrl = this;

		$ctrl.onChange = function(){
			console.log( $ctrl.state );
			$ctrl.changeCB({res: {newVal: $ctrl.state, oldVal: !$ctrl.state }});
		};
	}
};
