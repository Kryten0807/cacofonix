const pathsToLint = ['./src/**/*.js', './test/**/*.js', './gulpfile.js'];

// -----------------------------------------------------------------------------
// watch the files that need linting
//
module.exports = (gulp) =>
    gulp.watch(pathsToLint, ['lint']);
