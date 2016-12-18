(function () {
    'use strict';

    angular
        .module('App.Quote')
        .factory('QuoteService', QuoteService);

    QuoteService.$inject = ['$http', '$q', '$location'];

    function QuoteService($http, $q, $location) {

        var service = {};

        service.getQuote = function () {

            var defer = $q.defer();

            $http({
                url: 'api/Quote',
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

        service.addQuote = function (data) {

            var defer = $q.defer();

            $http({
                url: 'api/Quote',
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

        return service;
    }
})();