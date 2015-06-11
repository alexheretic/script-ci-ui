angular.module('app')
  .controller('HeaderController', function($location) {
    this.paths = [
      {description:'Single', path:'/single'},
      {description:'Job', path:'/job'}
    ];

    this.isActive = function(p) {
      return p.path == $location.path();
    };
  });