var browserify = require('browserify');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var jsdoc = require('gulp-jsdoc3');
var del = require('del');

gulp.task('rtcontrol', function() {
	return browserify('./src/RealTimeController.js')
		.bundle()
		.pipe(source('rtcontrol.js'))
		.pipe(buffer())
		//.pipe(uglify())
		.pipe(gulp.dest('./ui/js'));
});

gulp.task('controladorIndex', function() {
	gulp.src('./src/index-controlar.js')
		.pipe(uglify().on('error', function(e) {
			console.error(e);
		}))
		.pipe(rename('controladorIndex.js'))
		.pipe(gulp.dest('./ui/js'));
});

gulp.task('docs', ['clean:docs'], function(cb) {
	var config = require('./jsdoc.json');
	gulp.src(['README.md', './src/**/*.js'], {
			read: false
		})
		.pipe(jsdoc(config, cb));
});

gulp.task('clean:docs', function() {
	return del([
		'docs/**/*',
		'!docs/Documentacao.mdj',
		'!docs/UML/**'
	]);
});

gulp.task('clean:js', function() {
	return del([
		'./ui/js/**/*'
	]);
});

gulp.task('stream', function() {
	gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('build', ['clean:js', 'rtcontrol', 'controladorIndex']);
