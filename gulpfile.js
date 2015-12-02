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
    watch = require('gulp-watch'),
    del = require('del');

// Styles
gulp.task('styles', function() {
  return gulp.src('src/css/*.css')
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe((imagemin({ optimizationLevel: 5, progressive: true, interlaced: true, use: [pngquant()] })))
    .pipe(gulp.dest('assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

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
    .pipe(notify({ message: 'CSS task complete' }));
});

// Clean
gulp.task('clean', function() {
    return del(['assets/css', 'assets/images', 'assets/js']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('src/components/'))
});

// Watch
gulp.task('watch', function() {

  // Watch .css files
  gulp.watch('src/css/*', ['css']);

  // Watch .js files
  gulp.watch('src/js/*', ['js']);

  // Watch image files
  gulp.watch('src/images/*', ['images']);

});
