'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');
var markdox = require('gulp-markdox');
var concat = require('gulp-concat');

gulp.task('hint', function() {
  return gulp.src([
    'gulpfile.js',
    'www/*.js',
    'test/unit/spec/*.js',
    'test/integration/www/js/*.js',
    'test/integration/www/spec/*.js'
  ])
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

gulp.task('doc', function() {
  return gulp.src('www/*.js')
    .pipe(markdox())
    .pipe(concat('README.md'))
    .pipe(gulp.dest('doc'));
});

gulp.task('default', [
  'hint',
  'browserify',
]);
