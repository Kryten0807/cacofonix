const mocha = require('gulp-mocha');

const paths = require('./paths.json');

module.exports = (gulp) => {
    require('babel-register'); // eslint-disable-line global-require

    return gulp.src((process.env.TEST_SUITE || paths.specs), { read: false })
        .pipe(mocha({
            require:  [paths.testconfig],
            // reporter: 'progress',
            // an alternate reporter is 'dot',
        }));
};
