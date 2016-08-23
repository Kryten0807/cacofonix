const gulp = require('gulp');
const mocha = require('gulp-mocha');

require('babel-register');

// -----------------------------------------------------------------------------
// run the tests
//
gulp.task('test', () =>
    gulp.src((process.env.TEST_SUITE || './src/**/*.spec.js'), { read: false })
        .pipe(mocha({
            require:  ['./test/setup.js'],
            // reporter: 'progress',
            // an alternate reporter is 'dot',
        }))
);
