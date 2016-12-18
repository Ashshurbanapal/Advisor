angular
    .module('App')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/',
        {
            templateUrl: '/App_Scripts/Home/Home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .when('/AddQuote',
        {
            templateUrl: '/App_Scripts/Quote/AddQuote.html',
            controller: 'AddQuoteController',
            controllerAs: 'vm'
        })
        .when('/AddQuoteSuccess',
        {
            templateUrl: '/App_Scripts/Quote/SuccessPage.html',
            controller: 'SuccessQuoteController',
            controllerAs: 'vm'
        })
        .when('/AddRecipe',
        {
            templateUrl: '/App_Scripts/AddRecipe/AddRecipe.html',
            controller: 'AddRecipeController',
            controllerAs: 'vm',
            resolve: {
                data: typesLoader
            }
        })
        .when('/Advisor',
        {
            templateUrl: '/App_Scripts/Advisor/AdvisorPage.html',
            controller: 'AdvisorController',
            controllerAs: 'vm',
            resolve: {
                data: typesLoader
            }
        })
        .when('/Error/:message',
        {
            templateUrl: '/App_Scripts/Error/ErrorPage.html',
            controller: 'ErrorController',
            controllerAs: 'vm'
        });

    $routeProvider.otherwise({ redirectTo: '/' });

    typesLoader.$inject = ['AddRecipeService'];
    function typesLoader(AddRecipeService) {
        return AddRecipeService.getAllTypes();
    }
}
