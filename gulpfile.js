/*jshint node: true */
"use strict";

var pkg = require('./package.json');
var fs = require('fs');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var replace = require('gulp-replace');

gulp.task('lint', function() {
  
  return gulp.src([
      './gulpfile.js',
      './src/*.js'
     ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
 
});

gulp.task('build', function() {
  
  return fs.readFile('./src/devizr.tests.js', 'utf8', function(err, tests) {
    
    if (err) {
      throw err;
    }
    
    // Removing first 4 lines  
    // and adding indent to all other lines in test file 
    var lines_indent = [];
    var lines = tests.split('\n');
    lines.forEach(function(line, index){
      if(index > 3) {
        lines_indent.push('    ' + line);
      }
      
    });
    tests = lines_indent.join('\n');
    
    return gulp.src('./src/devizr.app.js')
      .pipe(replace(/\/\/\{\{DEVIZR-TESTS\}\}/i, tests))
      .pipe(replace(/\{\{VERSION\}\}/g, pkg.version))
      .pipe(replace(/\{\{YEAR\}\}/g, new Date().getFullYear()))
      .pipe(concat('devizr.default.js'))
      .pipe(gulp.dest('dest'))
      .pipe(uglify({ preserveComments: 'some' }))
      .pipe(concat('devizr.default.min.js'))
      .pipe(gulp.dest('dest'));
  
  });
 
});

gulp.task('default', [ 'lint', 'build' ]);
