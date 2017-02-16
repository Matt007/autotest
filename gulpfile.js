var gulp         = require('gulp');
//var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var webpack        = require('gulp-webpack');
var less			= require('gulp-less');
var path = require('path');
var react = require('gulp-react');
var cleanCSS = require('gulp-clean-css')
var concat = require('gulp-concat');

gulp.task('build', function() {
	
})


gulp.task('less', function() {
	return gulp.src('./src/css/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('theme.css'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('dev', function () {
    gulp.watch('./src/css/**/*.less', ['less']);
});