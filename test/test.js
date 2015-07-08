var _ = require('../index');
var L = 0;
var R = 1;
var ROOT = phantom.libraryPath;

var path = function(filename, index){
    //var paths = [ '1411574787376', '1411575747259' ];
    var paths = [ '1432196417289', '1432196480674' ];
    return ROOT + '/case/' + paths[index || 0] + '/' + filename;
};
var left = require(path('tree.json', L));
var right = require(path('tree.json', R));

var diff = _.diff(left, right);

var webpage = require('webpage');
var opt = {
    left: {
        rect: left.rect,
        title: 'old version',
        screenshot: path('screenshot.jpg', L)
    },
    right: {
        rect: right.rect,
        title: 'new version',
        screenshot: path('screenshot.jpg', R)
    },
    page: webpage.create(),
    diff: diff,
    // LCS diff priority, `head` or `tail`
    priority: 'head'
};
_.highlight(opt, function(err, page){
    if(err){
        console.log(err);
    } else {
        page.render('highlight.png');
    }
    phantom.exit();
});