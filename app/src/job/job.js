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

    if (this.jobId) {
      $http.get('http://localhost:8080/api/jobs/' + this.jobId)
      .then(function (response) {
        self.job = response.data;
      });
    }

    function refreshOutputUntilDone() {
      $http.get('http://localhost:8080/api/jobs/' + self.jobId + '/status/latest')
        .then(function (response) {
          self.status = response.data;

          var combinedOut = '',
            script = self.status.okScriptStatus;

          while (script && script.log) {
            if (combinedOut) combinedOut += '\n---\n\n';
            combinedOut += script.log
            script = (script.errorScriptStatus &&script.errorScriptStatus.started) ?
              script.errorScriptStatus : script.okScriptStatus;
          }

          self.status.out = combinedOut;

          if (!self.status.ended)
            $timeout(refreshOutputUntilDone, 200);
        });
    }

    this.save = function () {
      if (!self.jobId) {
        $http({
          method: 'POST',
          url: 'http://localhost:8080/api/jobs',
          headers: {'content-type': 'application/json'},
          data: self.job
        })
        .success(function(response) {
          self.jobId = response.data.id;
        });
      }
      else {
        $http({
          method: 'PUT',
          url: 'http://localhost:8080/api/jobs/'+ self.jobId,
          headers: {'content-type': 'application/json'},
          data: self.job
        });
      }
    };

    this.run = function() {
      delete self.status;
      $http.post('http://localhost:8080/api/jobs/' + self.jobId + '/run')
        .then(function(response) {
          console.warn('Ignoring run id '+ response.data.run);
          refreshOutputUntilDone();
        });
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
