angular.module('app')
  .directive('codeMirror', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      template: '<textarea></textarea>',
      scope: {
        'lang': '=',
        'theme': '=',
        'code': '='
      },
      link: function (scope, element, attrs) {
        var editor = CodeMirror.fromTextArea(
          $(element).children('textarea')[0], {
            lineNumbers: true,
            matchBrackets: true,
            highlightSelectionMatches: {minChars: 1}
          });

        editor.setSize(800, 500);

        scope.$watch('code', function(value) {
          if (value != editor.getValue())
            editor.setValue(value);
        });

        scope.$watch('lang', function(value) {
          editor.setOption('mode', value);
        });

        scope.$watch('theme', function(value) {
          editor.setOption('theme', value);
        });

        editor.on('change', function() {
          $timeout(function() {
            scope.code = editor.getValue();
          });
        });
      }
    };
  }]);