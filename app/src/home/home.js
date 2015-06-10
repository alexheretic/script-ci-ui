(function () {
  var DEFAULT_CODE = '#!sh\n';

  function HomeController($http, $timeout) {
    var self = this;
  }

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
