"use strict";

const
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  concatCss = require('gulp-concat-css'),
  htmlmin = require('gulp-htmlmin'),
  cssmin = require('gulp-cssmin'),
  replace = require('gulp-replace'),
  config = require('./package.json'),
  sass = require('gulp-sass'),
  modules = require('./modules'),
  gutil = require('gulp-util');

/**
 * компиляция модулей
 */
gulp.task('js-modules', (done) => {

  modules.forEach((module) => {

    gulp.src([
      `dist/js/modules/${module}/**/*.js`,
      `!dist/js/modules/${module}/lib/**/*.js`
    ])
      .pipe(concat(`./js/modules/${module}/app.js`))
      .pipe(uglify())
      .on('error', (err) => {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
      })
      .pipe(gulp.dest('./compile'));

    gulp.src([`dist/js/modules/${module}/lib/**/*.js`])
      .pipe(gulp.dest(`./compile/js/modules/${module}/lib`));

  });

  gulp.src(['./dist/js/common/**/*.js'])
    .pipe(concat('js/common/common.js'))
    .pipe(replace('{{ appVersion }}', config.version))
    .pipe(uglify())
    .on('error', (err) => {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('./compile'));

  done();
});

/**
 * node_modules compiling
 */
gulp.task('js-lib', function (done) {
  gulp.src(['node_modules/**/*'])
    .pipe(gulp.dest('compile/node_modules'));
  done();

});

/**
 * компиляция css файлов
 */
gulp.task('css', (done) => {

  modules.forEach(function (module) {
    gulp.src(`dist/css/modules/${module}/**/*.scss`)
      .pipe(sass().on('error', sass.logError))
      .pipe(concatCss(`css/modules/${module}/style.css`))
      .pipe(cssmin())
      .pipe(gulp.dest('compile/node_modules'))
      .pipe(gulp.dest('compile'));
  });

  gulp.src(['dist/css/common/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss(`css/common/style.css`))
    .pipe(cssmin())
    .pipe(gulp.dest('compile'));
  done();
});

/**
 * img compiling
 */
gulp.task('img', (done) => {
  gulp.src(['dist/img/**/*'])
    .pipe(gulp.dest('compile/img'));
  done();

});

/**
 * font compiling
 */
gulp.task('fonts', (done) => {
  gulp.src(['dist/fonts/**/*'])
    .pipe(gulp.dest('compile/fonts'));
  done();

});

/**
 * pdf compiling
 */
gulp.task('pdf', (done) => {
  gulp.src(['dist/pdf/**/*'])
      .pipe(gulp.dest('compile/pdf'));
  done();
});


/**
 * tpl compiling
 */
gulp.task('tpl', (done) => {
  gulp.src(['dist/**/*.html'])
    .pipe(replace('{{ appVersion }}', '1.0.0'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('compile'));
  done();
});
