'use strict';

var gulp = require('gulp');
var config = require('./gulp/config');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyhtml = require('gulp-minify-html');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var fileinclude = require('gulp-file-include');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;
var notify = require('gulp-notify');
var browserify = require('gulp-browserify');

// Test run for gulp
gulp.task('clean', function() {

	return gulp.src(config.base, {read: false})
	.pipe(clean())

});

// Compress all images
gulp.task('images', function() {

	return gulp.src(config.images.src)
		.pipe(plumber({
		    errorHandler: config.error
		}))
		.pipe(imagemin())
		.pipe(gulp.dest(config.base + config.images.folder));

});

gulp.task('misc:copy', function() {

    return gulp.src(config.misc.src)
        .pipe(plumber({
            errorHandler: config.error
        }))
        .pipe(gulp.dest(config.base));

});


gulp.task('js', function() {

	return gulp.src(config.js.src)
		.pipe(plumber({
		    errorHandler: config.error
		}))
		.pipe(uglify())
		.pipe(rename(config.js.destFile))
		.pipe(gulp.dest(config.base + config.js.folder))

});

gulp.task('browserify', function() {
    	
   	return gulp.src(config.js.src)
   		.pipe(plumber({
             errorHandler: config.error
        }))
    	.pipe(browserify({
      	insertGlobals : false
    	}))
        .pipe(uglify())
        .pipe(gulp.dest(config.base + config.js.folder));

});

// Compress HTML
gulp.task('html', function() {
	
	// Fileinclude
	return gulp.src(config.html.src)
		.pipe(plumber({
		    errorHandler: config.error
		}))
	    .pipe(fileinclude({
	    	prefix: '@@',
	    	basepath: '@root'
	    }))
	    .pipe(gulp.dest(config.base));
	

	return gulp.src(config.html.src)
	.pipe(minifyhtml())
	.pipe(gulp.dest(config.base))

});

// Compress Css
gulp.task('css', function() {

	return gulp.src(config.css.src)
		.pipe(plumber({
		    errorHandler: config.error
		}))
		.pipe(autoprefixer({

			browsers: ['> 1%', 'last 2 versions'],
			cascade: false

		}))
		.pipe(rename(config.css.destFile))
		.pipe(gulp.dest(config.base + config.css.folder))

});

// Static server
gulp.task('browser-sync', function() {
   
    browserSync.init({
        server: {
            baseDir: config.base,
            startPath: '/',
            open: true
        }, 
        tunnel: "martijnnieuwenhuizen"
    });

});

// Watch task
gulp.task('watch', function() {

	gulp.watch([config.html.watch], ['html', reload]);
	gulp.watch([config.css.watch], ['css', reload]);
	gulp.watch(config.js.watch, ['browserify', reload]);
	gulp.watch(config.misc.src, ['misc:copy', reload]);

});

// Server task
gulp.task('server', ['clean'], function() {

	return runSequence(
		['html', 'css', 'images', 'misc:copy'],
		'browserify',
		'browser-sync',
		'watch'
	);

});


