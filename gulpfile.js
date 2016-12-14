// increase the number of listeners to prevent annoying warnings
//
require('events').EventEmitter.prototype._maxListeners = 30;

// npm dependencies
//
const requireTasks = require('gulp-require-tasks');

// initialize the task import
//
requireTasks({ path: `${__dirname}/gulp` });
