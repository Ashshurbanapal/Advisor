(function () {
    'use strict';

    angular
        .module('App.Error')
        .controller('ErrorController', ErrorController);

    ErrorController.$inject = ['$scope', '$location', '$rootScope', '$route'];

    function ErrorController($scope, $location, $rootScope, $route) {

        var vm = this;

        vm.errorMessage = $route.current.params.message;
        vm.buttonText = "Show error message";
        vm.isShow = false;

        $rootScope.$emit('spinnerStop');

        vm.show = show;

        return vm;

        function show() {
            if (vm.isShow === false) {
                vm.isShow = true;
                vm.buttonText = "Hide error message";
            }
            else {
                vm.isShow = false;
                vm.buttonText = "Show error message";
            }
            
        }

    }
})();