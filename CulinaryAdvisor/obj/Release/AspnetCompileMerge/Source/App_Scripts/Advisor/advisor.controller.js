(function () {
    'use strict';

    angular
        .module('App.Advisor')
        .controller('AdvisorController', AdvisorController);

    AdvisorController.$inject = ['data', '$scope', '$location', '$rootScope', 'AdvisorService'];

    function AdvisorController(data, $scope, $location, $rootScope, AdvisorService) {

        var vm = this;

        vm.types = data.Data;
        vm.typeSelection = vm.types[0].Name;
        vm.button = "Looking";
        vm.submitted = false;
        vm.isFind = false;
        vm.nannySpeak = 'Well, you need my advice. Choose type of dish you want to cook and click the button! ';

        vm.recipe = null;

        vm.looking = looking;

        $rootScope.$emit('spinnerStop');

        return vm;

        function looking() {

            if (vm.submitted) {
                return;
            }

            vm.submitted = true;

            vm.submitText = 'Please Wait...';
            vm.nannySpeak = 'Looking something interesting for you...';
            $rootScope.$emit('spinnerStart');
            data = {
                Type: vm.typeSelection
            };
            AdvisorService.getRecipe(data)
                .then(callback);

            function callback(data) {
                if (data.Data === 'Error') {
                    $location.path("/Error/" + data);
                } else {
                    vm.recipe = data.Data;
                    vm.isFind = true;
                    vm
                        .nannySpeak =
                        'How do you like this?';
                    $rootScope.$emit('spinnerStop');
                }
                vm.submitted = false;
            }
        }

    }
})();