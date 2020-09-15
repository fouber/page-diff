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

-------