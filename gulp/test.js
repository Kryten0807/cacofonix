const mocha = require('gulp-mocha');

module.exports = (gulp) => {
    require('babel-register'); // eslint-disable-line global-require

    return gulp.src((process.env.TEST_SUITE || './src/**/*.spec.js'), { read: false })
        .pipe(mocha({
            require:  ['./test/setup.js'],
            // reporter: 'progress',
            // an alternate reporter is 'dot',
        }));
};
