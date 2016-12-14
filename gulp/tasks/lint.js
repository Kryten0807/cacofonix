const eslint = require('gulp-eslint');

const pathsToLint = ['./src/**/*.js', './test/**/*.js', './gulpfile.js'];

module.exports = (gulp) =>
    gulp.src(pathsToLint)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
