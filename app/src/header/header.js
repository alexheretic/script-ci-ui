angular.module('app')
  .controller('HeaderController', function($location) {
    this.paths = [
      {description:'Home', path:'/'},
      {description:'Single', path:'/single'},
      {description:'Jobs', path:'/jobs'}
    ];

    this.isActive = function(p) {
      return p.path == $location.path();
    };
  });