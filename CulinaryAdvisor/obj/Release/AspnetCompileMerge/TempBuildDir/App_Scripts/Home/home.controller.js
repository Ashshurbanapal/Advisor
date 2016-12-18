(function () {
	'use strict';

	angular
		.module('App')
		.controller('HomeController', HomeController);
        
	HomeController.$inject = ['$rootScope'];

	function HomeController($rootScope) {

        var vm = this;

        vm.message = 'This is my web store!';

		$rootScope.$emit('spinnerStop');
		
	    return vm;
	}
})();