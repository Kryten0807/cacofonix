// gulp plugins/other support packages
//
const sequence = require('gulp-sequence');

// -----------------------------------------------------------------------------
// clean the client files
//
module.exports = (gulp, callback) =>
    sequence('test', 'lint', 'clean', ['compile', 'docs'], callback);
