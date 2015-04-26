var gulp = require('gulp');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var spawn = require('child_process').spawn;
var browserSync = require("browser-sync").create();

gulp.task('default', ['build', 'watch', 'serve']);
gulp.task('build', ['build-js', 'build-css', 'copy-static']);
gulp.task('serve', ['browser-sync']);

gulp.task('build-js', function() {
  return gulp.src("src/app.js")
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task('build-css', function() {
  return gulp.src("src/**/*.css", { base: 'src' })
    .pipe(gulp.dest("dist"));
});


gulp.task('copy-static', function() {
  return gulp.src("src/static/**/*", { base: 'src/static'  })
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['build-js']);
  gulp.watch('src/**/*.css', ['build-css']);
  gulp.watch('src/static/**/*', ['copy-static']);

});

gulp.task('browser-sync', function() {
  // Full browser reload for JS or HTML changes
  gulp.watch(['dist/**/*.js', 'dist/**/*.html'], browserSync.reload);
  // Selective reload for CSS
  gulp.watch(['dist/**/*.css'], function() {
    return gulp.src('dist/**/*.css')
      .pipe(browserSync.reload({ stream: true }));
  });

  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});
