module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            all: {
                src: ['doubly-linked-list.js', 'tests/*.js']
            },
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};
