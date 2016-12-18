(function () {
    'use strict';

    angular
        .module('App.AddRecipe')
        .factory('AddRecipeService', AddRecipeService);

    AddRecipeService.$inject = ['$http', '$q', '$location'];

    function AddRecipeService($http, $q, $location) {

        var service = {};

        service.getAllTypes = function () {

            var defer = $q.defer();

            $http({
                url: 'api/Type',
                method: 'GET'
            })
            .success(successfullCallback)
            .error(failedCallback);

            return defer.promise;

            function successfullCallback(d) {
                defer.resolve(d);
            }

            function failedCallback(e) {
                defer.reject(e);
                $location.path("/Error/" + e);
            }
        }

        service.addRecipe = function (data) {

            var defer = $q.defer();

            $http({
                url: 'api/Recipe',
                method: 'PUT',
                data: JSON.stringify(data),
                headers: { 'content-type': 'application/json' }
            })
            .success(successfullCallback)
            .error(failedCallback);

            return defer.promise;

            function successfullCallback(d) {
                defer.resolve(d);
            }

            function failedCallback(e) {
                defer.reject(e);
                $location.path("/Error/" + e);
            }
        }

        return service;
    }
})();