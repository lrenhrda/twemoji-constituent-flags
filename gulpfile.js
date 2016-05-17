var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var raster = require('gulp-raster');
var rename = require('gulp-rename');
var sequence = require('run-sequence');

var size = 18;

gulp.task('1x', function() {
  gulp.src('./svg/**/*.svg')
    .pipe(svgmin())
    .pipe(cheerio({
      run: function($) {
        $('path').after('<rect fill="ffffff" fill-opacity="0" />');
        $('rect').attr({
          height: size,
          width: size
        });
      }
    }))
    .pipe(raster())
    .pipe(rename({ extname: '.png' }))
    .pipe(gulp.dest('./png'))
});

gulp.task('2x', function() {
  gulp.src('./svg/**/*.svg')
    .pipe(svgmin())
    .pipe(cheerio({
      run: function($) {
        $('path').after('<rect fill="ffffff" fill-opacity="0" />');
        $('rect').attr({
          height: size,
          width: size
        });
      }
    }))
    .pipe(raster({
      scale: 2
    }))
    .pipe(rename({ extname: '.png', suffix: '@2x' }))
    .pipe(gulp.dest('./png@2x'))
});

gulp.task('svgcleanup', function() {
  gulp.src('./svg/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./svg'));
});

gulp.task('build', function(cb) {
  sequence('1x', '2x', cb);
});

gulp.task('default', ['build']);
