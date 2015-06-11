(function () {

  var DEFAULT_CODE = '#!sh\n';
  var DEFAULT_NAME = 'job 1';

  function JobController($http, $timeout) {
    var self = this;

    this.lang = 'shell';
    this.theme = 'mbo';
    this.name = DEFAULT_NAME;

    this.okScript = {
      code: DEFAULT_CODE,
      errorScript: {code: DEFAULT_CODE},
      okScript: {code: DEFAULT_CODE}
    };
    this.hasOkScript = false;
    this.hasFailScript = false;

    $http.get('http://localhost:8080/api/jobs/single')
      .then(function (response) {
        if (self.code == DEFAULT_CODE)
          self.code = response.data.script;
      });

    function refreshOutputUntilDone() {
      $http.get("http://localhost:8080/api/jobs/single/out")
        .then(function (response) {
          self.out = response.data;
          if (!self.out.ended)
            $timeout(refreshOutputUntilDone, 200);
        });
    }

    this.send = function () {
      $http({
        method: 'POST',
        url: 'http://localhost:8080/api/jobs/single',
        headers: {'content-type': 'text/plain'},
        data: this.code
      })
        .success(refreshOutputUntilDone);
    };

    this.addOkScript = function () {
      this.hasOkScript = !this.hasOkScript;
    };
    this.addFailScript = function () {
      this.hasFailScript = !this.hasFailScript;
    };
  }

  angular.module('app')
    .config(function ($routeProvider) {
      $routeProvider.when('/job', {
        controller: 'JobController',
        controllerAs: 'controller',
        templateUrl: 'job/job.html'
      })
    })
    .controller('JobController', JobController);
})();
