# a new kernel of [page-monitor](https://github.com/fouber/page-monitor)

## Usage

```js
var pdiff = require('page-diff');
```

## API

### pdiff.walk(options)

> generate dom tree snapshot, run at webpage.

```js
var pdiff = require('page-diff');
var options = { /* see below */ };
var page = require('webpage').create();
page.open(url, function(){
    var tree = page.evaluate(pdiff.walk, options);
    console.log(tree);
});
```

options:

* root
    * desc: selector of root element
    * type: ``String``
    * default: ``body``

* invisibleElements
    * desc: invisible elements tag name
    * type: ``Array``
    * default: 
    
        ```js
        [
            "applet", "area", "audio", "base", "basefont",
            "bdi", "bdo", "big", "br", "center", "colgroup",
            "datalist", "form", "frameset", "head", "link",
            "map", "meta", "noframes", "noscript", "optgroup",
            "option", "param", "rp", "rt", "ruby", "script",
            "source", "style", "title", "track", "xmp"
        ]
        ```

* ignoreChildrenElements
    * desc: ignore childnodes elements tag name
    * type: ``Array``
    * default: 
    
        ```js
        [
            "img", "canvas", "input", "textarea", "audio",
            "video", "hr", "embed", "object", "progress",
            "select", "table"
        ]
        ```
    
* styleFilters
    * desc: the style properties which are invisible
    * type: ``Array``
    * default:
    
        ```js
        [
            "margin-left", "margin-top", "margin-right", "margin-bottom",
            "border-left-color", "border-left-style", "border-left-width",
            "border-top-color", "border-top-style", "border-top-width",
            "border-right-color", "border-right-style", "border-right-width",
            "border-bottom-color", "border-bottom-style", "border-bottom-width",
            "border-top-left-radius", "border-top-right-radius",
            "border-bottom-left-radius", "border-bottom-right-radius",
            "padding-left", "padding-top", "padding-right", "padding-bottom",
            "background-color", "background-image", "background-repeat",
            "background-size", "background-position",
            "list-style-image", "list-style-position", "list-style-type",
            "outline-color", "outline-style", "outline-width",
            "font-size", "font-family", "font-weight", "font-style", "line-height",
            "box-shadow", "clear", "color", "display", "float", "opacity", "text-align",
            "text-decoration", "text-indent", "text-shadow", "vertical-align", "visibility",
            "position"
        ]
        ```

* attributeFilters
    * desc: the attributes of element which make an unique identification
    * type: ``Array``
    * default:
    
        ```js
        [ 'id', 'class' ]
        ```

* excludeSelectors
    * desc: the selectors of exclude elements
    * type: ``Array|String``
    * default: ``[]``

* ignoreTextSelectors
    * desc: the selectors of elements whose text changes be ignored
    * type: ``Array|String``
    * default: ``[]``

* ignoreStyleSelectors
    * desc: the selectors of elements whose style changes be ignored
    * type: ``Array|String``
    * default: ``[]``

### pdiff.diff(left, right, opt)

> calc the difference between two versions of walk results

```js
var pdiff = require('page-diff');
var options = { /* see below */ };
var page = require('webpage').create();
page.open(url1, function(){
    var left = page.evaluate(pdiff.walk, walkOpt);
    page.open(url2, function(){
        var right = page.evaluate(pdiff.walk, walkOpt);
        var ret = pdiff.diff(left, right, diffOpt);
        console.log(ret);
    });
});
```

options:

* priority
    * desc: the logic of LCS，``head`` or ``tail``
    * type: ``String``
    * default: ``head``

### pdiff.highlight(options, callback)

> highlight the diff

```js
var pdiff = require('page-diff');
var options = { /* see below */ };
var webpage = require('webpage');
var page = webpage.create();
page.open(url1, function(){
    page.render('<full_path>/left.png');
    var left = page.evaluate(pdiff.walk, walkOpt);
    page.open(url2, function(){
        page.render('<full_path>/right.png');
        var right = page.evaluate(pdiff.walk, walkOpt);
        var ret = pdiff.diff(left, right, diffOpt);
        var hlOpt = {
            diff: ret,
            left: {
                rect: left.rect,
                title: 'old version',
                screenshot: '<full_path>/left.png'
            },
            right: {
                rect: right.rect,
                title: 'new version',
                screenshot: '<full_path>/right.png'
            },
            page: webpage.create()
        };
        pdiff.highlight(hlOpt, function(err, page){
            if(err){
                console.log('[ERROR] ' + err);
            } else {
                page.render('diff.png');
            }
        });
    });
});
```

options:

* diff
    * desc: diff result from ``pdiff.diff()``
    * type: ``Array``
    * required: ``YES``
* left
    * desc: left screenshot info
    * type: ``Object``
    * required: ``YES``
    * data
        * title: ``String`` screenshot title
        * rect: ``Array`` tree.rect property
        * screenshot: ``String`` screenshot url or path
* right
    * desc: right screenshot info
    * type: ``Object``
    * required: ``YES``
    * data
        * title: ``String`` screenshot title
        * rect: ``Array`` tree.rect property
        * screenshot: ``String`` screenshot url or path
* page
    * desc: webpage object
    * type: ``Webpage`` (phantomjs)
    * default: null
* settings:
    * desc: page.settings, see [here](http://phantomjs.org/api/webpage/property/settings.html)
    * type: ``Object``
    * default:
    
        ```js
        {
            "resourceTimeout": 20000
        }
        ```

* style
    * desc: highlight style
    * type: ``Object``
    * default:
    
        ```js
        {
            add: {
                title: "新增(Added)",
                backgroundColor: "rgba(127, 255, 127, 0.3)",
                borderColor: "#090",
                color: "#060",
                textShadow: "0 1px 1px rgba(0, 0, 0, 0.3)"
            },
            remove: {
                title: "删除(Removed)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderColor: "#999",
                color: "#fff"
            },
            style: {
                title: "样式(Style)",
                backgroundColor: "rgba(255, 0, 0, 0.3)",
                borderColor: "#f00",
                color: "#f00"
            },
            text: {
                title: "文本(Text)",
                backgroundColor: "rgba(255, 255, 0, 0.3)",
                borderColor: "#f90",
                color: "#c30"
            }
        }
        ```

-------