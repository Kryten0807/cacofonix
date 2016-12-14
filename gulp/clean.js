const shell = require('gulp-shell');

const paths = require('./paths.json');

module.exports = (gulp) =>
    gulp.src(`${paths.dist}/**/*.js`, { read: false })
        .pipe(shell('rm <%= file.path %>'));
