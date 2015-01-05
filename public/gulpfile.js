var clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  fs = require('fs'),
  templateCache = require('gulp-angular-templatecache'),
  connect = require('connect'),
  http = require('http'),
  argv = require('yargs').argv;

var cssDestination = 'dist/css',
  jsDestination = 'dist/js';

// Serve up app.
gulp.task('serve', function() {
  var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static('.'));

  http.createServer(app).listen(4000);
});

// Wipe out the JavaScript, Stylesheet and Web Font destinations.
gulp.task('clean', function() {
  return gulp.src([jsDestination + '/**/*', cssDestination + '/**/*'], {
      read: false
    })
    .pipe(clean())
});

// Watch and rebuild JavaScript and Stylesheets.
gulp.task('default', ['clean', 'templates', 'js', 'css', 'serve'], function() {
  console.log('Watching development files...');
  gulp.watch(['templates/**/*.html'], ['templates']);
  gulp.watch(['../dist/js/**/*', 'src/js/**/*'], ['js']);
  gulp.watch(['src/css/**/*'], ['css']);
});

// Compile templates.
gulp.task('templates', function() {
  gulp.src('templates/**/*.html')
    .pipe(templateCache({
      root: '/templates/',
      standalone: true
    }))
    .pipe(gulp.dest('src/js'));
});

// Build JavaScript files.
gulp.task('js', function() {
  return gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/uikit/js/uikit.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular/angular.js',
      'bower_components/restangular/dist/restangular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-local-storage/angular-local-storage.js',
      'bower_components/ng-debounce/angular-debounce.js',
      'bower_components/threejs/build/three.min.js',
      'src/js/templates.js',
      'src/js/app.js',
      'src/js/controllers/**/*.js',
      'src/js/directives/**/*.js',
      'src/js/services/**/*.js'
    ])
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(jsDestination));
});

// Build Stylesheets.
gulp.task('css', function() {
  return gulp.src([
      'bower_components/**/*.css',
      'src/css/**/*.scss'
    ])
    .pipe(sass({
      errLogToConsole: false,
      onError: function(err) {
        gutil.log(err);
        gutil.beep();
      }
    }))
    .pipe(concat('all.css'))
    .pipe(gulp.dest(cssDestination));
});

// Build assets.
gulp.task('dist', ['clean', 'templates', 'js', 'css'], function() {
  return gulp.src('dist/js/all.min.js')
    .pipe(uglify({
      outSourceMap: true,
      mangle: false
    }))
    .pipe(gulp.dest('dist/js'));
});
