lean = require('gulp-clean'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    argv = require('yargs').argv;

var jsDestination = 'dist/js';

// Wipe out the JavaScript destinations.
gulp.task('clean', function() {
  return gulp.src([jsDestination + '/**/*'], {read: false})
    .pipe(clean())
});

// Watch and rebuild JavaScript.
gulp.task('default', ['clean', 'js'], function () {
  console.log('Watching development files...');
  gulp.watch(['src/js/**/*'], ['js']);
});

// Build JavaScript files.
gulp.task('js', function () {
      'bower_components/**/*.js',
	    'src/js/**/*.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest(jsDestination));
});

// Build production assets.
gulp.task('dist', ['clean', 'js'], function() {
  return gulp.src('dist/js/all.js')
    .pipe(uglify({outSourceMap: true, mangle: false}))
    .pipe(gulp.dest('dist/js'));
});
