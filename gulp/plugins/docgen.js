/* eslint-disable no-var */

// npm dependencies
//
const through = require('through2');
const docgen = require('react-docgen');
const File = require('vinyl');

/**
 * The quick-and-dirty react-docgen plugin
 * @return {Stream} The stream
 */
const docGen = function docGen(options) {
    // implement the default options
    //
    const opts = Object.assign({
        name: 'react-docgen.json',
    }, options || {});

    // declare a variable to hold the list of files
    //
    const fileList = [];

    return through.obj(

        // eslint-disable-next-line prefer-arrow-callback
        function write(file, encoding, callback) {
            // is the file null? if so, just carry on
            //
            if (file.isNull()) {
                return callback(null, file);
            }

            // add the file to the list of files
            //
            fileList.push(file);

            // carry on...
            //
            return callback();
        },

        function end(callback) {
            // declare a variable to hold the results
            //
            const result = {};

            // iterate over the list of files
            //
            fileList.forEach((file) => {
                // declare a variable to hold the results
                //
                var doc = null;

                // get the file contents
                //
                const content = file.contents.toString();

                // attempt to parse the content
                //
                try {
                    doc = docgen.parse(content);
                } catch (err) {
                    // log the error?
                }

                // did we get some parsed content? if so, add it to the results
                if (doc) {
                    result[file.relative] = doc;
                }
            });

            // push the new file containing the JSON-encoded results
            //
            this.push(new File({
                contents: new Buffer(JSON.stringify(result, null, '  ')),
                base:     '/tmp',
                path:     `/tmp/${opts.name}`,
            }));

            // carry on...
            //
            callback();
        }

    );
};

module.exports = docGen;
