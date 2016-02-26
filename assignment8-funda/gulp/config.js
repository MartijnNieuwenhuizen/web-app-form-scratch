'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = {

    build: './build/',
    dist: './dist/',
    base: './build/',
    taskPath: './gulp/tasks/',
    
    html: {
        watch: ['src/html/**/*.html'],
        src: ['./src/html/**/*.html', '!./src/html/includes/**']
    },
    
    css: {
        watch: ['src/css/*.css'],
        src: ['./src/css/style.css'],
        folder: 'css/',
        destFile: 'style.css'
    },

    js: {
        watch: ['./src/js/**/*.js', '!./src/js/lib/*.js', '!./src/js/modules/webWorker.js'],
        src: ['./src/js/**/*.js'],
        folder: 'js/',
        destFile: 'script.min.js'
    },
    
    images: {
        watch: ['src/img/**'],
        src: ['./src/img/**'],
        srcFolder: './src/img/',
        folder: 'img/'
    },
    
    misc: {
        src: [
            'fonts/**',
            '*.ico',
            'src/.*',
            './src/js/lib/*.js',
            './src/js/modules/webWorker.js'
        ],
    },

    error: function(error) {

        $.notify.onError({
            title: 'Gulp',
            message: 'Error: <%= error.message %>'
        })(error);
        this.emit('end');

    }
};

module.exports = config;