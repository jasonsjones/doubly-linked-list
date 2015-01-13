module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            gruntfile: {
                src: ['Gruntfile.js']
            },
            js: {
                src: ['*.js']
            },
            test: {
                src: ['test/**/*.js']
            },
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },
        mochacli: {
            options: {
                reporter: 'spec',
                bail: true
            },
            all: ['test/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');

    grunt.registerTask('default', ['jshint', 'mochacli']);
};
