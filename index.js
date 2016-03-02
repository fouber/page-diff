exports.diff = require('./lib/diff');
exports.walk = require('./lib/walk');
exports.highlight = require('./lib/highlight');

if(typeof phantom !== 'undefined'){
    var root = phantom.libraryPath;
} else {
    root = __dirname;
}
exports.LIBRARY_PATH = root + '/lib';
exports.DIFF_SCRIPT_PATH = root + '/lib/diff.js';
exports.WALK_SCRIPT_PATH = root + '/lib/walk.js';
exports.HIGHLIGHT_SCRIPT_PATH = root + '/lib/highlight.js';