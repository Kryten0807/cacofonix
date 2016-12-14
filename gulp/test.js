// gulp plugins/other support packages
//
const mocha = require('gulp-mocha');
const yargs = require('yargs');

// import the paths
//
const paths = require('./paths.json');

module.exports = (gulp) => {
    // the test files are written in ES6. Import the babel-register package to
    // transpile them as needed. I'm doing this here, rather than globally, so
    // that the package is not loaded unless the test task is being run
    //
    require('babel-register'); // eslint-disable-line global-require

    // get the test suite (or paths) to use
    //
    const testSuite = yargs.argv.suite || yargs.argv.s || paths.specs;

    return gulp.src(testSuite, { read: false })
        .pipe(mocha({
            require:  [paths.testconfig],
            // reporter: 'progress',
            // an alternate reporter is 'dot',
        }));
};
