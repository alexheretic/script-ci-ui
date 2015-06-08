(function () {
  angular.module('app')
    .config(function ($routeProvider) {
        $routeProvider.when('/example', {
            controller: 'ExampleController',
            controllerAs: 'controller',
            templateUrl: 'example/example.html'
        })
    })
    .controller('ExampleController', function ExampleController() {
        console.log('example');
    });
})();
