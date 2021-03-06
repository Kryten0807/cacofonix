/* eslint-disable no-var */

// npm dependencies
//
const File = require('vinyl');
const through = require('through2');
const path = require('path');

/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const stringOfLength = (string, length) => {
    var newString = '';
    for (var i = 0; i < length; i++) { // eslint-disable-line id-length,vars-on-top
        newString += string;
    }
    return newString;
};

const generateTitle = (filepath) => {
    const componentName = path.basename(filepath, '.js');

    const title = `\`${componentName}\` Component (${filepath})`;
    return `${title}\n${stringOfLength('=', title.length)}\n`;
};

const generateDescription = (description) => `${description}\n`;

const generatePropType = (type) => {
    var values;
    if (Array.isArray(type.value)) {
        values = `(${type.value.map((typeValue) => typeValue.name || typeValue.value).join('|')})`;
    } else {
        values = type.value;
    }

    return `type: \`${type.name}${values || ''}\`\n`;
};

const generatePropDefaultValue = (value) => `defaultValue: \`${value.value}\`\n`;

const generateProp = (propName, prop) => {
    const descriptor = `${propName}${prop.required ? ' (required)' : ''}`;

    const description = prop.description ? `${prop.description}\n\n` : '';

    const type = prop.type ? generatePropType(prop.type) : '';

    const def = prop.defaultValue ? generatePropDefaultValue(prop.defaultValue) : '';

    return `### ${descriptor}\n\n${description}${type}${def}\n`;
};

const generateProps = (props) => {
    const description = Object.keys(props)
        .sort()
        .map((propName) => generateProp(propName, props[propName]))
        .join('\n');
    return `Props\n-----\n\n${description}`;
};

const generateMarkdown = function generateMarkdown(filepath, reactAPI) {

    const markdownString =
        `${generateTitle(filepath)}\n`
        + `${generateDescription(reactAPI.description)}\n`
        + `${generateProps(reactAPI.props)}`;

    return markdownString;
};


const toMarkdown = function toMarkdown(options) {
    // implement the default options
    //
    const opts = Object.assign({
        name: 'react-docgen.md',
    }, options || {});

    return through.obj(function write(file, encoding, callback) {
        var markdown = '';

        if (file.isNull()) {
            return callback(null, file);
        }

        const reactAPI = JSON.parse(file.contents.toString());

        Object.keys(reactAPI).forEach((filename) => {
            markdown += generateMarkdown(filename, reactAPI[filename]);
        });

        // push the new file containing the JSON-encoded results
        //
        this.push(new File({
            contents: new Buffer(markdown),
            base:     '/tmp',
            path:     `/tmp/${opts.name}`,
        }));

        // carry on...
        //
        return callback();

    });
};

module.exports = toMarkdown;
