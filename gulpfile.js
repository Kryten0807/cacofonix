const gulp = require('gulp');
const mocha = require('gulp-mocha');
const babel = require('gulp-babel');
const shell = require('gulp-shell');
const eslint = require('gulp-eslint');

require('babel-register');

// -----------------------------------------------------------------------------
// clean the project
//
gulp.task('clean', () =>
    gulp.src('./dist/**/*.js', { read: false })
        .pipe(shell('rm <%= file.path %>'))
);

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

// -----------------------------------------------------------------------------
// build the project
//
gulp.task('build', ['clean'], () =>
    gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
        .pipe(babel())
        .pipe(gulp.dest('./dist'))
);
