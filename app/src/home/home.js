(function () {

  function HomeController($http) {
    var self = this;
    this.jobs = [];
    $http.get('http://localhost:8080/api/jobs')
      .then(function (response) {
        self.jobs = response.data;
        console.log(self.jobs);
      });
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
