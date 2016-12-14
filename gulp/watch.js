
const paths = require('./paths.json');

// -----------------------------------------------------------------------------
// watch the files that need linting
//
module.exports = (gulp) =>
    gulp.watch(paths.lint, ['lint']);
