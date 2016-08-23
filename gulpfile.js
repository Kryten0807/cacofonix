const gulp = require('gulp');
const mocha = require('gulp-mocha');
const babel = require('gulp-babel');
const shell = require('gulp-shell');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');

require('babel-register');

const pathsToLint = ['./src/**/*.js', './test/**/*.js', './gulpfile.js'];

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

// -----------------------------------------------------------------------------
// lint the project
//
gulp.task('lint', () =>
    gulp.src(pathsToLint)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

// -----------------------------------------------------------------------------
// lint the project, fixing any errors which can be fixed
//
gulp.task('lint:fix', () => {
    const paths = pathsToLint;

    const isFixed = (file) => file.eslint != null && file.eslint.fixed;

    return gulp.src(paths, { base: './' })
        .pipe(eslint({ fix: true }))
        .pipe(gulpIf(isFixed, gulp.dest('./')))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

});
