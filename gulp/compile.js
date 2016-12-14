const babel = require('gulp-babel');

// -----------------------------------------------------------------------------
// build the project
//
module.exports = (gulp) =>
    gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
        .pipe(babel())
        .pipe(gulp.dest('./dist'));
