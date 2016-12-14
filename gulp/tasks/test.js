const mocha = require('gulp-mocha');

require('babel-register');

module.exports = (gulp) =>
    gulp.src((process.env.TEST_SUITE || './src/**/*.spec.js'), { read: false })
        .pipe(mocha({
            require:  ['./test/setup.js'],
            // reporter: 'progress',
            // an alternate reporter is 'dot',
        }));
