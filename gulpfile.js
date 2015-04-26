var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var spawn = require('child_process').spawn;
var browserSync = require('browser-sync').create();
var amdOptimize = require('amd-optimize');

var CONFIG = {
  browserSync: {
    port: 9000
  }
};
var PATH = {
  out: {
    dist: 'out/dist',
    maps: 'maps', // Relative to `PATH.out.js`
    js: 'out/dist/js',
    css: 'out/dist/css',
    static: 'out/dist'
  },
  src: {
    base: 'src',
    js: 'src/js',
    css: 'src/css',
    static: 'src/static'
  },
  lib: {
    bower: 'bower_components'
  }
};
var FILE = {
  in: {
    jsEntryModule: 'main'
  },
  out: {
    css: 'main.css',
    js: 'main.js'
  }
};
var GLOB = {
  src: {
    js:  PATH.src.js + '/*.js',
    es6: PATH.src.js + '/*.es6',
    css: PATH.src.css + '/*.css',
    static: PATH.src.static + '/*'
  },
  dist: {
    css: 'out/dist/**/*.css',
    js: 'out/dist/**/*.js',
    html: 'out/dist/**/*.html'
  }
};

gulp.task('default', ['build', 'watch', 'serve']);
gulp.task('build', ['build-js', 'build-css', 'copy-static', 'copy-runtime-libs']);
gulp.task('serve', ['browser-sync']);

gulp.task('auto-reload', function() {
	var process;

	function restart() {
		if (process) {
			process.kill();
		}

		process = spawn('gulp', ['default'], {stdio: 'inherit'});
	}

	gulp.watch('gulpfile.js', restart);
	restart();
});

gulp.task('build-js', function() {
  return gulp.src([GLOB.src.es6, GLOB.src.js], { base: PATH.src.js })
    .pipe(sourcemaps.init())
      // Compile ES6 -> ES5
      .pipe(babel({
        modules: 'amd'
      }))
      // Order files in stream based on module dependencies
      .pipe(amdOptimize(FILE.in.jsEntryModule))
      // .pipe(concat(FILE.out.js))
    .pipe(sourcemaps.write(PATH.out.maps))
    .pipe(gulp.dest(PATH.out.js));
});

gulp.task('copy-runtime-libs', function() {
  return gulp.src([
    PATH.lib.bower + '/requirejs/require.js'
  ], { base: PATH.lib.bower })
    .pipe(gulp.dest(PATH.out.js));
});

gulp.task('build-css', function() {
  return gulp.src([
    // TODO: import this in a CSS preprocessor
    'bower_components/foundation/css/normalize.css',
    'bower_components/foundation/css/foundation.css',
    GLOB.src.css
  ], { base: PATH.src.base })
    .pipe(sourcemaps.init())
      .pipe(concat(FILE.out.css))
    .pipe(sourcemaps.write(PATH.out.maps))
    .pipe(gulp.dest(PATH.out.css));
});

gulp.task('copy-static', function() {
  return gulp.src(GLOB.src.static, { base: PATH.src.static  })
    .pipe(gulp.dest(PATH.out.static));
});

gulp.task('watch', function() {
  gulp.watch([ GLOB.src.js, GLOB.src.es6 ], ['build-js']);
  gulp.watch(GLOB.src.css, ['build-css']);
  gulp.watch(GLOB.src.static, ['copy-static']);
});

gulp.task('browser-sync', function() {
  // Full browser reload for JS or HTML changes
  gulp.watch([ GLOB.dist.js, GLOB.dist.html ], browserSync.reload);

  // Selective reload for CSS
  gulp.watch([GLOB.dist.css], function() {
    return gulp.src(GLOB.dist.css)
      .pipe(browserSync.reload({ stream: true }));
  });

  browserSync.init({
    server: {
      baseDir: PATH.out.dist
    },
    port: CONFIG.browserSync.port,
    ui: {
      port: CONFIG.browserSync.port + 1
    }
  });
});
