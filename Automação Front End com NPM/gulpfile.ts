import gulp from 'gulp';
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;

function compilaSass() {
  return gulp
    .src('css/scss/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

gulp.task('sass', compilaSass);

function gulpJS() {
  return gulp
    .src('js/main/*.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream());
}

gulp.task('mainjs', gulpJS);

function browser() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
}

gulp.task('browser-sync', browser);

function watch() {
  gulp.watch('css/scss/*.scss', compilaSass);
  gulp.watch('js/main/*.js');
  gulp.watch('*.html').on('change', browserSync.reload);
}

gulp.task('watch', watch);

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));
