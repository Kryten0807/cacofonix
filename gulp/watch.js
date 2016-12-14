// import the paths
//
const paths = require('./paths.json');

module.exports = (gulp) =>
    gulp.watch(paths.lint, ['lint']);
