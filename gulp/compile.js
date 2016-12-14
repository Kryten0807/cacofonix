// gulp plugins/other support packages
//
const babel = require('gulp-babel');

// import the paths
//
const paths = require('./paths.json');

// -----------------------------------------------------------------------------
// build the project
//
module.exports = (gulp) =>
    gulp.src(paths.source)
        .pipe(babel())
        .pipe(gulp.dest(paths.dist));
