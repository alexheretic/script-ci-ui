(function () {

  function ExampleController() {
    this.lang = 'shell';
    this.theme = 'mbo';
    this.code = '#!/bin/bash\n' +
    '\n' +
    '# rsync using variables\n' +
    'SOURCEDIR=/home/user/Documents/\n' +
    'DESTDIR=/media/diskid/user_backup/Documents/\n' +
    '\n' +
    'rsync -avh --exclude="*.bak" $SOURCEDIR $DESTDIR\n' +
    '\n' +
    'exit 0';
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
