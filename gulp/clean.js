const shell = require('gulp-shell');

module.exports = (gulp) =>
    gulp.src('./dist/**/*.js', { read: false })
        .pipe(shell('rm <%= file.path %>'));
