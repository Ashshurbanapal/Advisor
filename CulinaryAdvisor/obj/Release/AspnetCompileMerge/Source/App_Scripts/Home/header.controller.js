(function () {
    'use strict';

    angular
		.module('App')
		.controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$rootScope', '$location', 'usSpinnerService'];

    function HeaderController($scope, $rootScope, $location, usSpinnerService) {

        var vm = this;

        vm.spinneractive = false;

        $rootScope.$on('$locationChangeStart',
            function () {
                usSpinnerService.spin('spinner-1');
            });

        $rootScope.$on('us-spinner:spin', function (event, key) {
            vm.spinneractive = true;
        });

        $rootScope.$on('us-spinner:stop', function (event, key) {
            vm.spinneractive = false;
        });

        $rootScope.$on('spinnerStart',
            function () {
                usSpinnerService.spin('spinner-1');
            });

        $rootScope.$on('spinnerStop',
            function () {
                usSpinnerService.stop('spinner-1');
            });

        return vm;

    }
})();