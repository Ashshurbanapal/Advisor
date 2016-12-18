(function () {
    'use strict';

    angular
        .module('App.AddRecipe')
        .controller('AddRecipeController', AddRecipeController);

    AddRecipeController.$inject = ['data', '$scope', '$location', '$rootScope', 'AddRecipeService'];

    function AddRecipeController(data, $scope, $location, $rootScope, AddRecipeService) {

        var vm = this;

        vm.types = data.Data;
        vm.typeSelection = vm.types[0].Name;
        vm.submitText = "Save";
        vm.submitted = false;
        vm.message = '';
        vm.isFormValid = false;
        vm.isAdded = false;
        vm.nannySpeak = 'Here you can share with me your recipe. Please, fill required fields, and click save.';

        vm.newRecipe = {
            Name: '',
            Description: '',
            Ingredients: '',
            Process: '',
            Author: '',
            Type: ''
    };

        $scope.$watch('NewRecipeForm.$valid', function (newValue) {
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

                vm.submitText = 'Please Wait...';
                vm.nannySpeak = 'I am writing your recipe...';
                $rootScope.$emit('spinnerStart');
                
                vm.newRecipe = data;
                vm.newRecipe.Type = vm.typeSelection;

                AddRecipeService.addRecipe(vm.newRecipe)
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
                        'Thankee, Deary! I wrote your recipe in my cookbook. And now I can recommend it to others!';
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