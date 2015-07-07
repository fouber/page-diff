/**
 * dom tree snapshot diff, can run at anywhere
 * @param {Object} left
 * @param {Object} right
 * @param {Object} opt
 * @returns {Array}
 */
module.exports = function(left, right, opt){

    /**
     * change type enum
     * @type {{ADD: number, REMOVE: number, STYLE: number, TEXT: number}}
     */
    var CHANGE_TYPE = {
        ADD:    1,  // 0001
        REMOVE: 2,  // 0010
        STYLE:  4,  // 0100
        TEXT:   8   // 1000
    };

    /**
     * equal
     * @param {Object} left
     * @param {Object} right
     * @returns {boolean}
     */
    var equal =function (left, right){
        var type = typeof left;
        if(type === typeof right){
            switch(type){
                case 'object':
                    var lKeys = Object.keys(left);
                    var rKeys = Object.keys(right);
                    if(lKeys.length === rKeys.length){
                        for(var i = 0; i < lKeys.length; i++){
                            var key = lKeys[i];
                            if(!right.hasOwnProperty(key) || (left[key] !== right[key])){
                                return false;
                            }
                        }
                        return true;
                    } else {
                        return false;
                    }
                    break;
                default:
                    return left === right;
            }
        } else {
            return false;
        }
    };

    /**
     * match
     * @param {Object} left
     * @param {Object} right
     * @returns {boolean}
     */
    var isMatch = function (left, right){
        return (left.name === right.name) && equal(left.attr, right.attr);
    };

    /**
     * common logic of `LCSHeadFirst’ and `LCSTailFirst‘
     * @param {Object} old
     * @param {Object} cur
     * @param {Function} match
     * @param {Number} x
     * @param {Array} lastLine
     * @param {Array} currLine
     */
    var LCSProc = function (old, cur, match, x, lastLine, currLine){
        if(match(old, cur)){
            var sequence = (lastLine[x-1] || []).slice(0);
            sequence.push({ l: old, r: cur });
            currLine[x] = sequence;
        } else {
            var lSeq = currLine[x-1];
            var tSeq = lastLine[x];
            if(lSeq && tSeq){
                if(lSeq.length < tSeq.length){
                    currLine[x] = tSeq.slice(0);
                } else {
                    currLine[x] = lSeq.slice(0);
                }
            } else if(lSeq) {
                currLine[x] = lSeq.slice(0);
            } else if(tSeq) {
                currLine[x] = tSeq.slice(0);
            }
        }
    };

    /**
     * Longest common subsequence (obverse)
     * @param {Array} left
     * @param {Array} right
     * @param {Function} match
     * @returns {Array}
     */
    var LCSHeadFirst = function (left, right, match){
        var lastLine = [];
        var currLine = [];
        var y = left.length;
        var len = right.length;
        while(y--){
            var old = left[y];
            var i = len;
            while(i--){
                var cur = right[i];
                var x = len -  i - 1;
                LCSProc(old, cur, match, x, lastLine, currLine);
            }
            lastLine = currLine;
            currLine = [];
        }
        return (lastLine.pop() || []);
    };

    /**
     * Longest common subsequence (reverse)
     * @param {Array} left
     * @param {Array} right
     * @param {Function} match
     * @returns {Array}
     */
    var LCSTailFirst = function (left, right, match){
        var lastLine = [];
        var currLine = [];
        left.forEach(function(old){
            right.forEach(function(cur, x){
                LCSProc(old, cur, match, x, lastLine, currLine);
            });
            lastLine = currLine;
            currLine = [];
        });
        return (lastLine.pop() || []);
    };

    /**
     * diff change
     * @param {Object} left
     * @param {Object} right
     * @param {Object} opt
     * @returns {Array}
     */
    var diff = function(left, right, opt){
        var ret = [];
        var change = {
            type: 0,
            node: right
        };
        if(left.style !== right.style){
            change.type |= CHANGE_TYPE.STYLE;
        }
        var LCS = opt.priority === 'head' ? LCSHeadFirst : LCSTailFirst;
        LCS(left.child, right.child, isMatch).forEach(function(node){
            var old = node.l;
            var cur = node.r;
            cur.matched = old.matched = true;
            if(cur.name === '#'){
                if(old.text !== cur.text){
                    // match node, but contents are different.
                    change.type |= CHANGE_TYPE.TEXT;
                }
            } else {
                // recursive
                ret = ret.concat(diff(old, cur, opt));
            }
        });
        right.child.forEach(function(node){
            if(!node.matched){
                if(node.name === '#'){
                    // add text, but count as text change
                    change.type |= CHANGE_TYPE.TEXT;
                } else {
                    // add element
                    ret.push({
                        type: CHANGE_TYPE.ADD,
                        node: node
                    });
                }
            }
        });
        left.child.forEach(function(node){
            if(!node.matched){
                if(node.name === '#'){
                    // remove text, but count as text change
                    change.type |= CHANGE_TYPE.TEXT;
                } else {
                    // removed element
                    ret.push({
                        type: CHANGE_TYPE.REMOVE,
                        node: node
                    });
                }
            }
        });
        if(change.type){
            ret.push(change);
        }
        return ret;
    };

    return diff(left, right, opt);
};