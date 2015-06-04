var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

gulp.task('clean', function() {
  var paths = require('del').sync('dist');
  if (paths.length)
    console.log(['Deleted files/folders:'].concat(paths).join('\n - '));
});


// bundles up the bits on codemirror we want,
// only needs to be run when we change codemirror stuff
gulp.task('bundle-codemirror-js', function() {
  return gulp.src([
      'app/lib/codemirror/lib/codemirror.js',
      'app/lib/codemirror/mode/{shell,javascript,python}/*.js',
      'app/lib/codemirror/addon/edit/matchbrackets.js',
      'app/lib/codemirror/addon/search/match-highlighter.js'])
    .pipe(concat('codemirror.all.js'))
    .pipe(require('gulp-uglify')())
    .pipe(gulp.dest('app/lib/codemirror-bundle'));
});
gulp.task('bundle-codemirror-css', function() {
  return gulp.src(['app/lib/codemirror/lib/codemirror.css',
      'app/lib/codemirror/theme/*.css'])
    .pipe(concat('codemirror.all.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/lib/codemirror-bundle'));
});
gulp.task('bundle-codemirror', ['bundle-codemirror-css', 'bundle-codemirror-js']);

// sets up dist dir, adds sym links to lib, index.html
gulp.task('build-dist', ['bundle-codemirror'], function() {
  var fs = require('fs');
  var symlinkOrCopySync = require('symlink-or-copy').sync;

  fs.exists('dist', function(exists) {
    if (!exists) fs.mkdirSync('dist');

    fs.exists('dist/lib', function(exists) {
      if (!exists) symlinkOrCopySync('app/lib', 'dist/lib');
    });

    fs.exists('dist/index.html', function(exists) {
      if (!exists) symlinkOrCopySync('app/index.html', 'dist/index.html');
    });
  });
});

// src less -> dist/app.css
gulp.task('build-src-css', function() {
  var less = require('gulp-less');
  var concatCss = require('gulp-concat-css');

  return gulp.src('app/src/**/*.less')
    .pipe(less())
    .pipe(concatCss('app.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/'));
});

// src js -> dist/app.js
gulp.task('build-src-js', function() {
  return gulp.src('app/src/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build-src', ['build-src-css', 'build-src-js']);

gulp.task('default', ['clean', 'build-dist', 'build-src']);
