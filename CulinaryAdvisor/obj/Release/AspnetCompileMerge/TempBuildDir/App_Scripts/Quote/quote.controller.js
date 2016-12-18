(function () {
    'use strict';

    angular
        .module('App.Quote')
        .controller('QuoteController', QuoteController);

    QuoteController.$inject = ['QuoteService', '$scope', '$rootScope', '$location'];

    function QuoteController(QuoteService, $scope, $rootScope, $location) {

        var vm = this;

        QuoteService.getQuote().then(function(d) {
            vm.quote = d.Data;
        });

        vm.next = next;

        return vm;
        
        function next() {
            QuoteService.getQuote()
                .then(function(d) {
                    vm.quote = d.Data;
                });
        }
    }
})();