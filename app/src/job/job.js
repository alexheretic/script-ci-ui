(function () {

  var DEFAULT_CODE = '#!sh\n';
  var DEFAULT_NAME = 'job 1';

  function JobController($http, $timeout, $routeParams) {
    var self = this;
    this.jobId = $routeParams.jobId;
    this.lang = 'shell';
    this.theme = 'mbo';
    this.name = DEFAULT_NAME;
    this.hasOkScript = false;
    this.hasFailScript = false;

    this.job = {
      okScript: {
        code: DEFAULT_CODE,
        errorScript: {code: DEFAULT_CODE},
        okScript: {code: DEFAULT_CODE}
      }
    };
    if(this.jobId) {
      $http.get('http://localhost:8080/api/jobs/' + this.jobId)
      .then(function (response) {
        self.job = response.data;
      });
    }

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
        url: 'http://localhost:8080/api/jobs',
        headers: {'content-type': 'application/json'},
        data: this.job
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
      $routeProvider
        .when('/jobs/:jobId', {
          controller: 'JobController',
          controllerAs: 'controller',
          templateUrl: 'job/job.html'
        })
        .when('/jobs', {
          controller: 'JobController',
          controllerAs: 'controller',
          templateUrl: 'job/job.html'
        })
    })
    .controller('JobController', JobController);
})();
