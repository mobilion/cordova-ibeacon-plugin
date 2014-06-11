'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');

gulp.task('hint', function() {
  return gulp.src(['www/*.js', 'test/unit/**/*.js', 'test/integration/www/js/*.js', 'test/integration/www/spec/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
  return browserify('./www/ibeacon.js')
    .require('./test/unit/mock/cordova.exec.js', {
      expose: 'cordova/exec'
    })
    .external('cordova/exec')
    .bundle({
      debug: true,
      standalone: 'ibeacon',
    })
    .pipe(source('ibeacon.js'))
    .pipe(gulp.dest('test/unit/.tmp'));
});

gulp.task('default', [
  'hint',
  'browserify',
]);
