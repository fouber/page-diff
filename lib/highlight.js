var html = '<!doctype><html><head><meta charset="utf-8"><title>hello world</title><style>*{padding:0;margin:0;border:0;border-spacing:0}img{display:inline-block}html,body{white-space:nowrap;background:#fff;vertical-align:top;font-family:consolas,menlo,monaco,monospace,"courier new","helvetica neue","hiragino sans gb","wenquanyi micro hei",\\5FAE\\8F6F\\96C5\\9ED1,\\5B8B\\4F53,arial,verdana,sans-serif}h1{font-size:18px;color:#fff;text-align:center;background:#000;line-height:24px;height:24px}#left,#right{position:absolute;width:100%;height:100%;overflow:hidden;top:0;left:0;right:0;bottom:0}.item{display:inline-block;vertical-align:top;margin:10px}#legend{font-size:18px;line-height:18px;padding-top:10px}.wrapper{padding-bottom:30px;border-bottom:1px solid #fff}.panel{border:1px solid #ccc;position:relative}</style></head><body><div class="wrapper"><div id="legend"></div><div class="item"><h1 id="left-title"></h1><div id="left-panel" class="panel"><div id="left"></div></div></div><div class="item"><h1 id="right-title"></h1><div id="right-panel" class="panel"><div id="right"></div></div></div></div></body></html>';

var highlight = function(opt, token){

    var DEFAULT_STYLE = {
        add: {
            title: '新增(Added)',
            backgroundColor: 'rgba(127, 255, 127, 0.3)',
            borderColor: '#090',
            color: '#060',
            textShadow: '0 1px 1px rgba(0, 0, 0, 0.3)'
        },
        remove: {
            title: '删除(Removed)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderColor: '#999',
            color: '#fff'
        },
        style: {
            title: '样式(Style)',
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
            borderColor: '#f00',
            color: '#f00'
        },
        text: {
            title: '文本(Text)',
            backgroundColor: 'rgba(255, 255, 0, 0.3)',
            borderColor: '#f90',
            color: '#c30'
        }
    };

    opt.style = opt.style || DEFAULT_STYLE;

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
     * get px string
     * @param {string} val
     * @returns {string}
     */
    var px = function(val){
        return val + 'px';
    };
    /**
     * document.getElementById
     * @param {String} id
     * @returns {HTMLElement}
     */
    var $ = function (id){
        return document.getElementById(id);
    };
    var start = function(){
        var CHANGE_STYLE = {};
        CHANGE_STYLE.ADD = opt.style.add;
        CHANGE_STYLE.REMOVE = opt.style.remove;
        CHANGE_STYLE.TEXT = opt.style.text;
        CHANGE_STYLE.STYLE = opt.style.style;
        var lContainer = $('left');
        var rContainer = $('right');
        var highlightElement = function (rect, options, container, offsetX, offsetY, useTitle){
            offsetX = parseInt(offsetX || 0);
            offsetY = parseInt(offsetY || 0);
            var div = document.createElement('x-diff-div');
            div.style.position = 'absolute';
            div.style.display = 'block';
            div.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
            div.style.border = '1px dashed #333';
            div.style.fontSize = '12px';
            div.style.fontWeight = 'normal';
            div.style.overflow = 'hidden';
            div.style.color = '#fff';
            div.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.4)';
            if(useTitle && options.title){
                var span = document.createElement('x-diff-span');
                span.innerHTML = options.title;
                div.appendChild(span);
            }
            for(var key in options){
                if(options.hasOwnProperty(key)){
                    div.style[key] = options[key];
                }
            }
            div.style.left = px(rect[0] - offsetX);
            div.style.top = px(rect[1] - offsetY);
            div.style.width = px(rect[2]);
            div.style.height = px(rect[3]);
            container.appendChild(div);
            return div;
        };
        // add lenged
        var lenged = $('legend');
        for(var key in CHANGE_STYLE){
            if(CHANGE_STYLE.hasOwnProperty(key)){
                var div = highlightElement([0, 0, 120, 18], CHANGE_STYLE[key], lenged, 0, 0, true);
                div.setAttribute('id', 's-' + key);
                div.style.position = 'static';
                div.style.margin = '5px 11px';
                div.style.display = 'inline-block';
                div.style.lineHeight = '18px';
                div.style.textAlign = 'center';
                div.style.fontWeight = 'bold';
            }
        }
        var count = {
            add: 0,
            remove: 0,
            style: 0,
            text: 0
        };
        // highlight diffs
        opt.diff.forEach(function(item){
            var node = item.node;
            var type = item.type;
            switch (type){
                case CHANGE_TYPE.ADD:
                    count.add++;
                    highlightElement(node.rect, CHANGE_STYLE.ADD, rContainer, opt.right.rect[0],  opt.right.rect[1]);
                    break;
                case CHANGE_TYPE.REMOVE:
                    count.remove++;
                    highlightElement(node.rect, CHANGE_STYLE.REMOVE, lContainer, opt.left.rect[0],  opt.left.rect[1]);
                    break;
                case CHANGE_TYPE.TEXT:
                    count.text++;
                    highlightElement(node.rect, CHANGE_STYLE.TEXT, rContainer, opt.right.rect[0],  opt.right.rect[1]);
                    break;
                default :
                    if(type & CHANGE_TYPE.STYLE){
                        count.style++;
                    }
                    if(type & CHANGE_TYPE.TEXT){
                        count.text++;
                    }
                    highlightElement(node.rect, CHANGE_STYLE.STYLE, rContainer, opt.right.rect[0],  opt.right.rect[1]);
                    break;
            }
        });
        for(key in CHANGE_STYLE){
            if(CHANGE_STYLE.hasOwnProperty(key)){
                div = $('s-' + key);
                var span = document.createElement('x-span');
                span.innerHTML = count[key.toLowerCase()] || 0;
                span.style.float = 'right';
                span.style.backgroundColor = 'rgba(0,0,0,0.8)';
                span.style.paddingLeft = '5px';
                span.style.paddingRight = '5px';
                span.style.height = '18px';
                span.style.lineHeight = '18px';
                span.style.color = '#fff';
                div.appendChild(span);
            }
        }
        console.log(token);
    };
    var check = function(){
        count--;
        if(count == 0){
            start();
        }
    };
    $('left-title').innerHTML = opt.left.title || '旧版本';
    $('right-title').innerHTML = opt.right.title || '新版本';
    var img = new Image();
    var count = 2;
    img.src = opt.left.screenshot;
    img.onload = check;
    $('left-panel').appendChild(img);
    img = new Image();
    img.src = opt.right.screenshot;
    img.onload = check;
    $('right-panel').appendChild(img);
};

module.exports = function(opt, callback){
    var page = opt.page || require('webpage').create();
    var token = 'HIGHLIGHT:' + Date.now() + '-' + Math.random();
    page.settings.resourceTimeout = 20000;
    if(opt.settings){
        for(var key in opt.settings){
            if(opt.settings.hasOwnProperty(key)){
                page.settings[key] = opt.settings[key];
            }
        }
    }
    page.settings.localToRemoteUrlAccessEnabled = true;
    page.settings.webSecurityEnabled = false;
    page.onConsoleMessage = function(msg){
        if(msg === token){
            callback(null, page);
        } else {
            console.log('[Console] ' + msg);
        }
    };
    page.setContent(html, 'highlight.html');
    page.evaluate(highlight, opt, token);
};