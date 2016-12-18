(function () {
    'use strict';

    angular
        .module('App.Advisor')
        .factory('AdvisorService', AdvisorService);

    AdvisorService.$inject = ['$http', '$q', '$location'];

    function AdvisorService($http, $q, $location) {

        var service = {};

        service.getRecipe = function (data) {

            var defer = $q.defer();

            $http({
                url: 'api/Recipe',
                method: 'POST',
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

        return service;
    }
})();