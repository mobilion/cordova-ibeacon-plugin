'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
  return browserify('./www/ibeacon.js')
    .require('./test/mock/cordova.exec.js', {
      expose: 'cordova/exec'
    })
    .external('cordova/exec')
    .bundle({
      debug: true,
      standalone: 'ibeacon',
    })
    .pipe(source('ibeacon.js'))
    .pipe(gulp.dest('test/.tmp'));
});