(function () {

  function HomeController() {}

  angular.module('app')
    .config(function ($routeProvider) {
      $routeProvider.when('/', {
        controller: 'HomeController',
        controllerAs: 'controller',
        templateUrl: 'home/home.html'
      })
    })
    .controller('HomeController', HomeController);
})();
