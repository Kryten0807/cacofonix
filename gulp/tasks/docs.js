
const docgen = require('../plugins/docgen');
const markdown = require('../plugins/markdown');
const paths = require('../paths.json');


module.exports = (gulp) =>
    gulp.src(paths.source)
        .pipe(docgen())
        .pipe(markdown({ name: 'REACT.md' }))
        .pipe(gulp.dest('./'));
