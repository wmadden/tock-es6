var
  gulp = require('gulp'),
  sourcemaps = require("gulp-sourcemaps"),
  babel = require("gulp-babel"),
  concat = require("gulp-concat");

gulp.task('default', function() {
  return gulp.src("src/app.js")
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
