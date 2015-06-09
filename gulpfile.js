var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var connect = require('gulp-connect');

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
      'app/lib/codemirror/mode/{shell,javascript,python,clike}/*.js',
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
gulp.task('build-lib-bundle', ['bundle-codemirror', 'build-lib']);

// sets up dist dir, adds sym links to lib, index.html
gulp.task('build-lib', function() {
  var fs = require('fs');
  var symlinkOrCopySync = require('symlink-or-copy').sync;

  fs.exists('dist', function(exists) {
    if (!exists) fs.mkdirSync('dist');

    fs.exists('dist/lib', function(exists) {
      if (!exists) symlinkOrCopySync('app/lib', 'dist/lib');
    });

    gulp.src(['app/index.html']).pipe(gulp.dest('dist/'));
    gulp.src(['app/src/**', '!app/src/init.js']).pipe(gulp.dest('dist/'));

    //fs.exists('dist/index.html', function(exists) {
    //  if (!exists) symlinkOrCopySync('app/index.html', 'dist/index.html');
    //});
    //fs.exists('dist/example', function(exists) {
    //  if (!exists) symlinkOrCopySync('app/src/example', 'dist/example');
    //});
  });
});

// src less -> dist/app.css
gulp.task('build-src-css', function() {
  var less = require('gulp-less');
  var concatCss = require('gulp-concat-css');

  return gulp.src('app/src/**/*.less')
    .pipe(less())
    .pipe(concatCss('app.css'))
    //.pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/'));
});

/**
 * src js -> dist/app.js
 */
gulp.task('build-src-js', function() {
  return gulp.src(['app/src/init.js', 'app/src/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/'));
});

/**
 * Starts a server on port 8000
 * with live reload enabled.
 * http://localhost:8000/dist/index.html
 */
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 8000,
    livereload: true
  });
});

/**
 * Reloads the dist dir on the server.
 */
gulp.task('reload', ['build-lib', 'build-src'], function () {
  gulp.src('dist/**')
    .pipe(connect.reload());
});

/**
 * Watches for changes on app folder,
 * generates all the dist files and
 * reloads the server.
 */
gulp.task('watch', ['default'], function () {
  gulp.watch(['app/index.html', 'app/src/**'], ['reload']);
});

gulp.task('server-watch', ['connect', 'watch']);
gulp.task('build-src', ['build-src-css', 'build-src-js']);
gulp.task('default', ['clean', 'build-lib-bundle', 'build-src']);
