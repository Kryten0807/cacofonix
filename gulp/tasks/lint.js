// gulp plugins/other support packages
//
const eslint = require('gulp-eslint');
const yargs = require('yargs');

const lintAndFix = require('../helpers/lintandfix');

// import the paths
//
const paths = require('../paths.json');

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
