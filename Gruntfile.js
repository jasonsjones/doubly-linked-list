module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            all: {
                src: ['index.js', 'test/*.js']
            },
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};
