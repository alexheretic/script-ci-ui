(function () {

  function ExampleController() {
    this.user = 'grgkdsrg;s';
    //this.examples = {
    //  shell: {
    //    code: '#!/bin/bash\n' +
    //    '\n' +
    //    '# rsync using variables\n' +
    //    'SOURCEDIR=/home/user/Documents/\n' +
    //    'DESTDIR=/media/diskid/user_backup/Documents/\n' +
    //    '\n' +
    //    'rsync -avh --exclude="*.bak" $SOURCEDIR $DESTDIR\n' +
    //    '\n' +
    //    'exit 0'
    //  },
    //  python: {
    //    code: '#!/usr/bin/env python3\n' +
    //    '\n' +
    //    'x = 1\n' +
    //    'if x == 1:\n' +
    //    '    # indented four spaces\n' +
    //    '    print "x is 1."\n' +
    //    'return 0'
    //  },
    //  javascript: {
    //    code: '#!/usr/bin/env node\n' +
    //    '\n' +
    //    'var x = 1, error = true;\n' +
    //    '\n' +
    //    'function print(text) {\n' +
    //    '    console.info(text);\n' +
    //    '}\n'+
    //    'if (x === 1) {\n' +
    //    '    // print some junk\n' +
    //    '    print("x is 1");\n' +
    //    '}\n\n' +
    //    'if (error) process.exit(1);'
    //  }
    //};
    //
    //['mbo'
    //  //,'zenburn','ambiance', 'base16-dark','monokai','twilight','3024-day','3024-night','ambiance-mobile',
    //  //'base16-light','blackboard','cobalt','colorforth','eclipse','elegant','erlang-dark','lesser-dark',
    //  //'liquibyte','mdn-like','midnight','neat','neo','night','paraiso-dark','paraiso-light','pastel-on-dark',
    //  //'rubyblue','solarized','the-matrix','tomorrow-night-bright','tomorrow-night-eighties','ttcn',
    //  //'vibrant-ink','xq-dark','xq-light'
    //]
    //  .forEach(function(theme) {
    //    $('body').append('<h4>' + theme);
    //    _.forIn(examples, function(example, lang) {
    //      $('body').append(text.clone());
    //
    //      var code = $('.codewrap:last').children('textarea');
    //      code.append(example.code);
    //
    //      var editor = CodeMirror.fromTextArea(code[0], {
    //        mode: lang,
    //        lineNumbers: true,
    //        theme: theme,
    //        matchBrackets: true,
    //        highlightSelectionMatches: { minChars: 1 }
    //      });
    //      editor.setSize(null, 250);
    //
    //    });
    //  });
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
