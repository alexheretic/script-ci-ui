(function () {

  var DEFAULT_CODE = '#!sh\n';

  function JobController($http, $timeout, $routeParams) {
    var self = this;
    this.jobId = $routeParams.jobId;
    this.lang = 'shell';
    this.theme = 'mbo';
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

    /**
     * Sends job scripts to server
     * @return promise
     */
    this.save = function () {
      if (!self.jobId) {
        return $http({
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
        return $http({
          method: 'PUT',
          url: 'http://localhost:8080/api/jobs/'+ self.jobId,
          headers: {'content-type': 'application/json'},
          data: self.job
        });
      }
    };

    /**
     * Saves & asks the server to run the job scripts
     * @return promise
     */
    this.run = function() {
      delete self.status;

      return self.save().then(function() {
        return $http.post('http://localhost:8080/api/jobs/' + self.jobId + '/run')
          .then(function(response) {
            console.warn('Ignoring run id '+ response.data.run);
            refreshOutputUntilDone();
          });
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
