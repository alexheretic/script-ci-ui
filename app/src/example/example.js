(function () {

  function ExampleController($http, $timeout) {
    var self = this;

    this.lang = 'shell';
    this.theme = 'mbo';
    this.code = '#!sh\n' +
    '\n' +
    'ls ../../.. -R\n' +
    'exit 0';

    function refreshOutputUntilDone() {
      $http.get("http://localhost:8080/api/jobs/single/out")
        .then(function(response) {
          self.out = response.data;
          if (!self.out.ended) $timeout(refreshOutputUntilDone, 200);
        });
    }

    this.send = function() {
      $http({
        method: 'POST',
        url: 'http://localhost:8080/api/jobs/single',
        headers: {'content-type':'text/plain'},
        data: this.code
      })
      .success(refreshOutputUntilDone);
    }
  }

  angular.module('app')
      .config(function ($routeProvider) {
        $routeProvider.when('/example', {
          controller: 'ExampleController',
          controllerAs: 'controller',
          templateUrl: 'example/example.html'
        })
      })
      .controller('ExampleController', ExampleController);
})();
