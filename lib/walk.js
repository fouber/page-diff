/**
 * generate dom tree snapshot, run at webkit
 * @param opt{Object}
 * @returns {Object}
 */

module.exports = function(opt){

    /*
     * JavaScript MD5 1.0.1
     * https://github.com/blueimp/JavaScript-MD5
     *
     * Copyright 2011, Sebastian Tschan
     * https://blueimp.net
     *
     * Licensed under the MIT license:
     * http://www.opensource.org/licenses/MIT
     *
     * Based on
     * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
     * Digest Algorithm, as defined in RFC 1321.
     * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * Distributed under the BSD License
     * See http://pajhome.org.uk/crypt/md5 for more info.
     */

    var md5 = function(){"use strict";function n(n,r){var t=(65535&n)+(65535&r),u=(n>>16)+(r>>16)+(t>>16);return u<<16|65535&t}function r(n,r){return n<<r|n>>>32-r}function t(t,u,e,o,c,f){return n(r(n(n(u,t),n(o,f)),c),e)}function u(n,r,u,e,o,c,f){return t(r&u|~r&e,n,r,o,c,f)}function e(n,r,u,e,o,c,f){return t(r&e|u&~e,n,r,o,c,f)}function o(n,r,u,e,o,c,f){return t(r^u^e,n,r,o,c,f)}function c(n,r,u,e,o,c,f){return t(u^(r|~e),n,r,o,c,f)}function f(r,t){r[t>>5]|=128<<t%32,r[(t+64>>>9<<4)+14]=t;var f,i,a,h,g,l=1732584193,v=-271733879,d=-1732584194,C=271733878;for(f=0;f<r.length;f+=16)i=l,a=v,h=d,g=C,l=u(l,v,d,C,r[f],7,-680876936),C=u(C,l,v,d,r[f+1],12,-389564586),d=u(d,C,l,v,r[f+2],17,606105819),v=u(v,d,C,l,r[f+3],22,-1044525330),l=u(l,v,d,C,r[f+4],7,-176418897),C=u(C,l,v,d,r[f+5],12,1200080426),d=u(d,C,l,v,r[f+6],17,-1473231341),v=u(v,d,C,l,r[f+7],22,-45705983),l=u(l,v,d,C,r[f+8],7,1770035416),C=u(C,l,v,d,r[f+9],12,-1958414417),d=u(d,C,l,v,r[f+10],17,-42063),v=u(v,d,C,l,r[f+11],22,-1990404162),l=u(l,v,d,C,r[f+12],7,1804603682),C=u(C,l,v,d,r[f+13],12,-40341101),d=u(d,C,l,v,r[f+14],17,-1502002290),v=u(v,d,C,l,r[f+15],22,1236535329),l=e(l,v,d,C,r[f+1],5,-165796510),C=e(C,l,v,d,r[f+6],9,-1069501632),d=e(d,C,l,v,r[f+11],14,643717713),v=e(v,d,C,l,r[f],20,-373897302),l=e(l,v,d,C,r[f+5],5,-701558691),C=e(C,l,v,d,r[f+10],9,38016083),d=e(d,C,l,v,r[f+15],14,-660478335),v=e(v,d,C,l,r[f+4],20,-405537848),l=e(l,v,d,C,r[f+9],5,568446438),C=e(C,l,v,d,r[f+14],9,-1019803690),d=e(d,C,l,v,r[f+3],14,-187363961),v=e(v,d,C,l,r[f+8],20,1163531501),l=e(l,v,d,C,r[f+13],5,-1444681467),C=e(C,l,v,d,r[f+2],9,-51403784),d=e(d,C,l,v,r[f+7],14,1735328473),v=e(v,d,C,l,r[f+12],20,-1926607734),l=o(l,v,d,C,r[f+5],4,-378558),C=o(C,l,v,d,r[f+8],11,-2022574463),d=o(d,C,l,v,r[f+11],16,1839030562),v=o(v,d,C,l,r[f+14],23,-35309556),l=o(l,v,d,C,r[f+1],4,-1530992060),C=o(C,l,v,d,r[f+4],11,1272893353),d=o(d,C,l,v,r[f+7],16,-155497632),v=o(v,d,C,l,r[f+10],23,-1094730640),l=o(l,v,d,C,r[f+13],4,681279174),C=o(C,l,v,d,r[f],11,-358537222),d=o(d,C,l,v,r[f+3],16,-722521979),v=o(v,d,C,l,r[f+6],23,76029189),l=o(l,v,d,C,r[f+9],4,-640364487),C=o(C,l,v,d,r[f+12],11,-421815835),d=o(d,C,l,v,r[f+15],16,530742520),v=o(v,d,C,l,r[f+2],23,-995338651),l=c(l,v,d,C,r[f],6,-198630844),C=c(C,l,v,d,r[f+7],10,1126891415),d=c(d,C,l,v,r[f+14],15,-1416354905),v=c(v,d,C,l,r[f+5],21,-57434055),l=c(l,v,d,C,r[f+12],6,1700485571),C=c(C,l,v,d,r[f+3],10,-1894986606),d=c(d,C,l,v,r[f+10],15,-1051523),v=c(v,d,C,l,r[f+1],21,-2054922799),l=c(l,v,d,C,r[f+8],6,1873313359),C=c(C,l,v,d,r[f+15],10,-30611744),d=c(d,C,l,v,r[f+6],15,-1560198380),v=c(v,d,C,l,r[f+13],21,1309151649),l=c(l,v,d,C,r[f+4],6,-145523070),C=c(C,l,v,d,r[f+11],10,-1120210379),d=c(d,C,l,v,r[f+2],15,718787259),v=c(v,d,C,l,r[f+9],21,-343485551),l=n(l,i),v=n(v,a),d=n(d,h),C=n(C,g);return[l,v,d,C]}function i(n){var r,t="";for(r=0;r<32*n.length;r+=8)t+=String.fromCharCode(n[r>>5]>>>r%32&255);return t}function a(n){var r,t=[];for(t[(n.length>>2)-1]=void 0,r=0;r<t.length;r+=1)t[r]=0;for(r=0;r<8*n.length;r+=8)t[r>>5]|=(255&n.charCodeAt(r/8))<<r%32;return t}function h(n){return i(f(a(n),8*n.length))}function g(n,r){var t,u,e=a(n),o=[],c=[];for(o[15]=c[15]=void 0,e.length>16&&(e=f(e,8*n.length)),t=0;16>t;t+=1)o[t]=909522486^e[t],c[t]=1549556828^e[t];return u=f(o.concat(a(r)),512+8*r.length),i(f(c.concat(u),640))}function l(n){var r,t,u="0123456789abcdef",e="";for(t=0;t<n.length;t+=1)r=n.charCodeAt(t),e+=u.charAt(r>>>4&15)+u.charAt(15&r);return e}function v(n){return unescape(encodeURIComponent(n))}function d(n){return h(v(n))}function C(n){return l(d(n))}function A(n,r){return g(v(n),v(r))}function m(n,r){return l(A(n,r))}function s(n,r,t){return r?t?A(r,n):m(r,n):t?d(n):C(n)}return s}();

    /**
     * combo selectors
     * @param {string} selectors
     * @returns {string}
     */
    var normalizeSelectors = function (selectors){
        if(Object.prototype.toString.call(selectors) === '[object Array]'){
            return selectors.join(',');
        } else {
            return String(selectors || '');
        }
    };

    // walk settings
    var INVISIBLE_ELEMENT = opt.invisibleElements || [
            'applet', 'area', 'audio', 'base', 'basefont',
            'bdi', 'bdo', 'big', 'br', 'center', 'colgroup',
            'datalist', 'form', 'frameset', 'head', 'link',
            'map', 'meta', 'noframes', 'noscript', 'optgroup',
            'option', 'param', 'rp', 'rt', 'ruby', 'script',
            'source', 'style', 'title', 'track', 'xmp'
        ];
    var IGNORE_CHILDREN_ELEMENT = opt.ignoreChildrenElements || [
            'img', 'canvas', 'input', 'textarea', 'audio',
            'video', 'hr', 'embed', 'object', 'progress',
            'select', 'table'
        ];
    var STYLE_FILTERS = opt.styleFilters || [
            'margin-left', 'margin-top', 'margin-right', 'margin-bottom',
            'border-left-color', 'border-left-style', 'border-left-width',
            'border-top-color', 'border-top-style', 'border-top-width',
            'border-right-color', 'border-right-style', 'border-right-width',
            'border-bottom-color', 'border-bottom-style', 'border-bottom-width',
            'border-top-left-radius', 'border-top-right-radius',
            'border-bottom-left-radius', 'border-bottom-right-radius',
            'padding-left', 'padding-top', 'padding-right', 'padding-bottom',
            'background-color', 'background-image', 'background-repeat',
            'background-size', 'background-position',
            'list-style-image', 'list-style-position', 'list-style-type',
            'outline-color', 'outline-style', 'outline-width',
            'font-size', 'font-family', 'font-weight', 'font-style', 'line-height',
            'box-shadow', 'clear', 'color', 'display', 'float', 'opacity', 'text-align',
            'text-decoration', 'text-indent', 'text-shadow', 'vertical-align', 'visibility',
            'position'
        ];
    var ATTR_FILTERS = opt.attributeFilters || [ 'id', 'class' ];
    // var INCLUDE_SELECTORS = normalizeSelectors(opt.includeSelectors);
    var EXCLUDE_SELECTORS = normalizeSelectors(opt.excludeSelectors);
    var IGNORE_CHILDREN_SELECTORS = normalizeSelectors(opt.ignoreChildrenSelectors);
    var IGNORE_TEXT_SELECTORS = normalizeSelectors(opt.ignoreTextSelectors);
    var IGNORE_STYLE_SELECTORS = normalizeSelectors(opt.ignoreStyleSelectors);
    var ROOT = opt.root || 'body';

    // reg
    var invisibleElementReg = new RegExp('^(' + INVISIBLE_ELEMENT.join('|') + ')$', 'i');
    var ignoreChildrenElementReg = new RegExp('^(' + IGNORE_CHILDREN_ELEMENT.join('|') + ')$', 'i');

    /**
     * invisible
     * @param {HTMLElement} elem
     * @returns {boolean}
     */
    var isInvisible = function (elem){
        var tagName = elem.tagName.toLowerCase();
        invisibleElementReg.lastIndex = 0;
        return (invisibleElementReg.test(tagName) || (tagName === 'input' && elem.type === 'hidden'));
    };

    /**
     * ignore child
     * @param {HTMLElement} elem
     * @returns {boolean}
     */
    var igonreChildren = function (elem){
        ignoreChildrenElementReg.lastIndex = 0;
        return ignoreChildrenElementReg.test(elem.tagName) ||
              (IGNORE_CHILDREN_SELECTORS && matches(elem, IGNORE_CHILDREN_SELECTORS));
    };

    var backgroundImageHashMap = {};

    /**
     * get computed styles of element, and hash them
     * @param {HTMLElement} elem
     * @returns {string}
     */
    var getStyles = function (elem){
        var ret = [];
        var filters = STYLE_FILTERS.slice(0);
        if(igonreChildren(elem)){
            filters.width = true;
            filters.height = true;
        }
        var styles = elem.ownerDocument.defaultView.getComputedStyle( elem, null );
        var display = styles.getPropertyValue('display');
        var opacity = styles.getPropertyValue('opacity');
        var visibility = styles.getPropertyValue('visibility');
        if(display === 'none' || opacity === '0' || visibility === 'hidden'){
            return false;
        } else {
            var position = styles.getPropertyValue('position');
            if(position !== 'static'){
                filters.push('top', 'right', 'bottom', 'left');
            }
            filters.forEach(function(key){
                var val = styles.getPropertyValue(key);
                val = val.replace(/\burl\s*\(([^\)]+)\)/ig, function(m, g1){
                    g1 = g1.replace(/^\s*['"]|['"]\s*$/g, '');
                    if(g1){
                        if(backgroundImageHashMap.hasOwnProperty(g1)) {
                            return backgroundImageHashMap[g1];
                        } else {
                            if(/^data:/.test(g1)){  // base64
                                m = md5(g1);
                            } else {
                                try {   // url
                                    var xhr = new XMLHttpRequest();
                                    xhr.open('GET', g1, false);
                                    xhr.send();
                                    m = md5(xhr.responseText);
                                } catch(e){
                                    m = '';
                                }
                            }
                            backgroundImageHashMap[g1] = m;
                        }
                    }
                    return m;
                });
                ret.push(val);
            });
        }
        return md5(ret.join('~'));
    };

    /**
     * get element bounding rect
     * @param {HTMLElement} elem
     * @returns {Array} [x, y, width, height]
     */
    var getRect = function (elem){
        var rect = elem.getBoundingClientRect();
        var doc = elem.ownerDocument;
        var win = doc.defaultView;
        var html = doc.documentElement;
        var x = Math.floor(rect.left + win.pageXOffset - html.clientLeft);
        var y = Math.floor(rect.top + win.pageYOffset - html.clientTop);
        var w = Math.floor(rect.width);
        var h = Math.floor(rect.height);
        return [x, y, w, h];
    };

    /**
     * get attributes of element
     * @param {HTMLElement} elem
     * @returns {Object|boolean}
     */
    var getAttr = function (elem){
        var ret = {};
        var filters = ATTR_FILTERS.slice(0);
        var hasAttr = false;
        if(elem.tagName.toLowerCase() === 'input'){
            filters.push('type');
        }
        filters.forEach(function(key){
            var attr = elem.getAttribute(key);
            if(attr !== null){
                hasAttr = true;
                ret[key] = attr;
            }
        });
        return hasAttr ? ret : false;
    };

    /**
     * filter elements
     * @param {HTMLElement} elem
     * @param {HTMLElement} parent
     * @returns {boolean}
     */
    var filter = function (elem, parent){
        var ret = true;
        switch (elem.nodeType){
            case 1:
                if(EXCLUDE_SELECTORS){
                    ret = ret && !matches(elem, EXCLUDE_SELECTORS);
                }
                // if(INCLUDE_SELECTORS){
                //     ret = ret && matches(elem, INCLUDE_SELECTORS);
                // }
                break;
            case 3:
                if(IGNORE_TEXT_SELECTORS){
                    ret = ret && !matches(parent, IGNORE_TEXT_SELECTORS);
                }
                break;
            default:
                ret = false;
                break;
        }
        return ret;
    };

    /**
     * matches
     * @param {HTMLElement} node
     * @param {String} selector
     * @returns Boolean
     */
    var matches = function(node, selector){
        var checklist = [ 'webkitMatchesSelector', 'matches', 'mozMatchesSelector', 'msMatchesSelector' ];
        for(var i = 0, len = checklist.length; i < len; i++){
            var name = checklist[i];
            if(typeof node[name] === 'function'){
                return node[name](selector);
            }
        }
        return false;
    };

    /**
     * walk dom tree
     * @param {HTMLElement} elem
     * @returns {Object}
     */
    var walk = function (elem){
        var node = {};
        if(elem.nodeType === 1){    // element
            node.name = elem.tagName.toLowerCase();
            if(!isInvisible(elem)){
                node.rect = getRect(elem);
                var attr = getAttr(elem);
                if(attr){
                    node.attr = attr;
                }
                if(IGNORE_STYLE_SELECTORS && matches(elem, IGNORE_STYLE_SELECTORS)){
                    node.style = '';
                } else {
                    node.style = getStyles(elem);
                }
                node.child = [];
                if(node.name === 'img'){
                    if(!(IGNORE_TEXT_SELECTORS && matches(elem, IGNORE_TEXT_SELECTORS))){
                        var canvas = document.createElement('canvas');
                        canvas.width = elem.offsetWidth;
                        canvas.height = elem.offsetHeight;
                        var ctx = canvas.getContext('2d');
                        elem.setAttribute('crossorigin', 'anonymous');
                        ctx.drawImage(elem, 0, 0);
                        // not ignore text
                        node.child.push({
                            name: '#',
                            text: md5(canvas.toDataURL())
                        });
                    }
                } else if(igonreChildren(elem)){ // ignore children
                    if(!(IGNORE_TEXT_SELECTORS && matches(elem, IGNORE_TEXT_SELECTORS))){
                        // not ignore text
                        node.child.push({
                            name: '#',
                            text: md5(elem.innerText.replace(/\s+/g, ' '))
                        });
                    }
                } else {
                    for(var i = 0, len = elem.childNodes.length; i < len; i++){
                        var child = elem.childNodes[i];
                        if(filter(child, elem)){    // recursion
                            var vdom = arguments.callee(child);  //
                            if(typeof vdom !== 'undefined' && vdom.style !== false){
                                node.child.push(vdom);
                            }
                        }
                    }
                }
                return node;
            }
        } else if(elem.nodeType === 3) {    // text node
            var text = elem.nodeValue.trim();
            if(text){
                node.name = '#';
                node.text = md5(text);
                return node;
            }
        }
    };

    if(opt.removeSelectors && opt.removeSelectors.length){
        opt.removeSelectors.forEach(function(selector){
            var elems = document.querySelectorAll(selector);
            for(var i = 0, len = elems.length; i < len; i++){
                var elem = elems[i];
                elem.parentNode.removeChild(elem);
                elem = null;
            }
        });
    }

    return walk(document.querySelector(ROOT));

};