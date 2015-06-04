(function () {
    function ExampleController() {
        console.log('example');
    }

    angular.module('app')
        .controller('ExampleController', ExampleController)
        .config(function ($routeProvider) {
            $routeProvider.when('/example', {
                controller: 'ExampleController',
                controllerAs: 'ExampleController',
                templateUrl: '/example/example.html'
            })
        });
});