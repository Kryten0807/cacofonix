// gulp plugins/other support packages
//
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const yargs = require('yargs');

// import the paths
//
const paths = require('./paths.json');

/**
 * A helper function to lint **and fix** a set of paths
 * @param  {Object} gulp The gulp instance
 * @param  {Array}  list The list of paths on which to operate
 * @return {Object}      The gulp stream
 */
const lintAndFix = (gulp, list) => {
    // declare a helper function to check if a file is fixed
    //
    const isFixed = (file) => file.eslint != null && file.eslint.fixed;

    // lint the files in the path with the fix option & return the stream
    //
    return gulp.src(list, { base: './' })
        .pipe(eslint({ fix: true }))
        .pipe(gulpIf(isFixed, gulp.dest('./')))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

module.exports = (gulp) => {
    // is the `--fix` flag set? if so, execute a "lint and fix"
    //
    if (yargs.argv.fix) {
        return lintAndFix(gulp, paths.lint);
    }

    // otherwise, just lint the files
    //
    return gulp.src(paths.lint)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

};
