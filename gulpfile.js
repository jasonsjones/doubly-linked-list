var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

var source = [
    '*.js',
    'test/*.js',
    'lib/*.js'
];

gulp.task('jshint', function() {
    log('Analyzing source with JSHint and JSCS...');
    return gulp.src(source)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jscs());
});

gulp.task('test', function () {
    log('Running unit tests with mocha...');
    return gulp
        .src(source[1])
        .pipe($.mocha());
});

/***************************/
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
