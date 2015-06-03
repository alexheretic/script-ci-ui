var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('default', ['clean', 'copy-libs', 'concat-css', 'concat-js']);



gulp.task('copy-libs', function() {
  return gulp.src(['app/lib/**'])
    .pipe(gulp.dest('app/dist/lib/'));
});  
//   return gulp.src([
//       'app/lib/codemirror/lib/codemirror.css',
//       'app/lib/codemirror/theme/*.css'])
//     .pipe(concat('codemirror.all.css'))
//     .pipe(minifyCss({compatibility: 'ie8'}))
//     .pipe(gulp.dest('app/dist/lib/'));
// });

gulp.task('concat-css', function() {
  return gulp.src([
      'app/lib/codemirror/lib/codemirror.css',
      'app/lib/codemirror/theme/*.css'])
    .pipe(concat('codemirror.all.css'))
    // .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/dist/lib/codemirror/'));
});

gulp.task('concat-js', function() {
  return gulp.src([
      // 'app/lib/codemirror/lib/codemirror.js',
      'app/lib/codemirror/mode/!({handlebars,dockerFile}.js)'])
    .pipe(concat('codemirror.all.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('app/dist/lib/codemirror'));
});

gulp.task('clean', function() {
  var paths = del.sync(['app/dist/!(index.html)']);
  console.log('Deleted files/folders:\n', paths.join('\n'));
});
