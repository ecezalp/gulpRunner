var gulp = require('gulp');
var webpack = require('webpack-stream');
var jasmine = require('gulp-jasmine');
var jasmineBrowser = require('gulp-jasmine-browser');
var eslint = require('gulp-eslint');
var watch = require('gulp-watch');
require('babel-core/register');

const home = 'src/index.js';
const test = ['spec/**/*.js', 'spec/**/*.jsx'];
const source = ['src/**/*.js', 'src/**/*.jsx'];
const project = source.concat(test);

gulp.task('bundle', function() {
  return gulp.src(home)
    .pipe(webpack( require('./webpack.config.js') ))
    // .pipe(minify())
    // other deployment actions
    .pipe(gulp.dest('dist/'));
});

gulp.task('spec', function() {
  return gulp.src(test)
    .pipe(watch(test, {name: "Spectre", verbose: true}).on(
      'all', (event, path) => {
        console.log(event, path);
      }
    ))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});

gulp.task('jasmine', function() {
  gulp.src(test)
    .pipe(jasmine())
});

gulp.task('lint', () => {
  return gulp.src(project)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

//on watch:
// i want to display what failed the compilation
// i want to see a reload indicator

//on test:

// i want to display what failed the jasmine test runner
// i want to see a reload indicator





// build (includes ES6 uglify/ minify)
// lint
// watch (dynamically serve dev)
//

//
// var project = "src/**/*.js"
//
// gulp.task('default', () =>
// gulp.src('spec/appSpec.js')
// // gulp-jasmine works on filepaths so you can't have any plugins before it
//   .pipe(jasmine())
// );