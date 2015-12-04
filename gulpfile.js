var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    bower = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files'),
    filter = require('gulp-filter'),
    order = require('gulp-order'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    del = require('del');

// JS Concat
gulp.task('js', function() {

	var jsFiles = ['src/js/*'];

	gulp.src(mainBowerFiles().concat(jsFiles))
		.pipe(filter('*.js'))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js'))
    .pipe(notify({ message: 'JS task complete' }));
});

// CSS Concat
gulp.task('css', function() {

	var cssFiles = ['src/css/*'];

	gulp.src(mainBowerFiles().concat(cssFiles))
		.pipe(filter('*.css'))
    .pipe(order([
			'normalize.css',
      'style.css',
      'animate.css',
			'*'
		]))
		.pipe(concat('main.css'))
		.pipe(minifycss())
		.pipe(gulp.dest('assets/css'))
    .pipe(notify({ message: 'CSS task complete' }))
    .pipe(livereload());
});

// Bower
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('src/components/'))
});

// Watch
gulp.task('watch', function() {

  // Create LiveReload server
  livereload.listen();

  // Watch any files in src/, reload on change
  gulp.watch(['src/**']).on('change', livereload.changed);

  // Watch .css files
  gulp.watch('src/css/*', ['css']);

  // Watch .js files
  gulp.watch('src/js/*', ['js']);

});

// Default task
gulp.task('default', function() {
    gulp.start('css', 'js', 'watch');
});
