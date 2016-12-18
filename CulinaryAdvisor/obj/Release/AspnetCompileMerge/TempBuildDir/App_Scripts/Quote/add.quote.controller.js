(function () {
    'use strict';

    angular
        .module('App.Quote')
        .controller('AddQuoteController', AddQuoteController);

    AddQuoteController.$inject = ['$scope', '$location', '$rootScope', 'QuoteService'];

    function AddQuoteController($scope, $location, $rootScope, QuoteService) {

        var vm = this;
        vm.submitText = "Save";
        vm.submitted = false;
        vm.message = '';
        vm.isFormValid = false;
        vm.isAdded = false;
        vm.nannySpeak = 'Here you can share interestin quote with me. Please, fill required fields, and click save.';

        vm.quote = {
            Text: '',
            Author: ''
        };

        $scope.$watch('NewQuoteForm.$valid', function (newValue) {
            vm.isFormValid = newValue;
        });

        vm.cancel = cancel;
        vm.saveData = saveData;
        vm.anotherOne = anotherOne;

        $rootScope.$emit('spinnerStop');

        return vm;

        function saveData(data) {

            if (vm.submitted) {
                return;
            }

            vm.submitted = true;
            vm.message = '';

            if (vm.isFormValid) {

                vm.nannySpeak = 'I am writing your quote...';
                vm.submitText = 'Please Wait...';
                $rootScope.$emit('spinnerStart');

                vm.quote = data;

                QuoteService.addQuote(vm.quote)
                    .then(callback);
            }
            else {
                vm.message = 'Please fill required fields value';
                vm.submitted = false;
            }

            function callback(data) {
                if (data.Data === 'Success') {
                    vm.isAdded = true;
                    vm
                        .nannySpeak =
                        'Thankee, Deary! I wrote your quote in my quotebook. And now I can say it to others!';
                    $rootScope.$emit('spinnerStop');
                } else {
                    $rootScope.$emit('spinnerStop');
                    $location.path("/Error/" + data);
                }
                vm.submitText = "Save";
                vm.submitted = false;
            }
        }

        function cancel() {
            $location.path("/");
        }

        function anotherOne() {
            vm.isAdded = false;
            vm.nannySpeak = 'Here you can share with me your recipe. Please, fill required fields, and click save.';
        }

    }
})();