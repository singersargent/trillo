var gulp = require('gulp'),
   watch = require('gulp-watch'),
   cssnano = require('gulp-cssnano'),
   sass = require('gulp-sass'),
   rename = require('gulp-rename'),
   browserSync = require('browser-sync').create(),
   autoprefixer = require('gulp-autoprefixer');

gulp.task('watch', function() {
   browserSync.init({
      server: {
         baseDir: 'app'
      }
   });

   watch('./app/index.html', function() {
      browserSync.reload();
   });

   watch('./app/sass/**/*.scss', function() {
      compileSass();
      injectCSS();
   });
});


function compileSass() {
   return gulp.src('app/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(cssnano())
      .pipe(rename('style.css'))
      .pipe(gulp.dest('app/css'));
}

function injectCSS() {
   return gulp.src('./app/css/style.css')
      .pipe(browserSync.stream());
}