# Meet jBone

[![Join the chat at https://gitter.im/kupriyanenko/jbone](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/kupriyanenko/jbone?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/kupriyanenko/jbone.svg?branch=master)](https://travis-ci.org/kupriyanenko/jbone)
[![Bower version](https://badge.fury.io/bo/jbone.svg)](http://jbone.js.org)
[![npm version](https://badge.fury.io/js/jbone.svg)](https://www.npmjs.com/package/jbone)
[![JS.ORG](https://img.shields.io/badge/js.org-jbone-ffb400.svg)](http://jbone.js.org)
[![CDNJS.COM](https://img.shields.io/badge/cdnjs.com-jbone-ffb400.svg)](https://cdnjs.com/libraries/jbone)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kupriyanenko/jbone)
[![GitHub Stats](https://img.shields.io/badge/github-stats-ff5500.svg)](http://githubstats.com/kupriyanenko/jbone)

jBone is very small and fast abstraction for Events and DOM manipulation in modern browsers with identical jQuery interfaces in most cases.

It replaces jQuery for Backbone in web and mobile applications (about 2.5kb gzipped, much faster than jQuery and Zepto).

## Why jBone?

The main idea of jBone is to use native JavaScript methods as much as possible in your project.

It is superior solution for applications based on Backbone and running on mobile devices as it is extremely small (2.5kb) and really fast library.

jBone project was created to allow people to use Backbone without jQuery.

See benchmark results [here](http://kupriyanenko.github.io/jbone/perf.html).

## Get it

##### Via bower

```
$ bower install jbone --save
```

##### Via component

```
component install kupriyanenko/jbone
```

##### Via nodejs or browserify

```
$ npm install jbone --save
```

## Use it

Add a `<script>` element for jbone.js

```html
<script src="path/to/jbone/dist/jbone.js"></script>
```

Or include it like npm module (with nodejs or browserify)

```javascript
var $ = require('jbone');
```

And write awesome code:

```javascript
var $input = $("<input>", {
    "class": "name"
}).val("John");

$input.on("click.space", function(e) {
    console.log("clicked on", this);
});

$input.trigger("click");

$input.off(".space");
```

## Extend it

```javascript
jBone.fn.addClass = function(className) {
    var i = 0,
        length = this.length;

    for (; i < length; i++) {
        this[i].classList.add(className);
    }

    return this;
};

$(".header").addClass("loaded");
```

## AJAX, Deferred

This part is not covered in jBone. You can choose one of a huge amount of AJAX implementations as well as standard Promises/A+ implementations.

For example: [when](https://github.com/cujojs/when), [Q](https://github.com/kriskowal/q), [simply-deferred](https://github.com/sudhirj/simply-deferred), [AJAX](microjs.com/#ajax).

Example of AJAX connection:

```javascript
// connect reqwest on your page https://rawgithub.com/ded/reqwest/master/reqwest.min.js

jBone.ajax = reqwest.compat;

$.ajax({
    url: "http://example.com"
});
```

Example of connection with Deferred Object:

```javascript
// connect simply-deferred on your page https://rawgithub.com/sudhirj/simply-deferred/master/deferred.min.js

Deferred.installInto(jBone);

var deferred = $.Deferred();

$.when(deferred).then(function(response) {
    // some code
});
```

## Browser support

Internet Explorer 11+

Safari 6+

iOS 5+ Safari

Android 2.3+ Browser

Chrome

Firefox

## IE9 polyfills

* [classList](https://github.com/remy/polyfills/blob/master/classList.js) (since IE10)
* [dataset](https://github.com/remy/polyfills/blob/master/dataset.js) (since IE11)


## API

[jBone](https://github.com/kupriyanenko/jbone/wiki/jBone)

* [jBone(selector[, context])](https://github.com/kupriyanenko/jbone/wiki/jBone#jboneselector)
* [jBone(element)](https://github.com/kupriyanenko/jbone/wiki/jBone#jboneelement)
* [jBone(elementArray)](https://github.com/kupriyanenko/jbone/wiki/jBone#jboneelementarray)
* [jBone(jBoneObject)](https://github.com/kupriyanenko/jbone/wiki/jBone#jbonejboneobject)
* [jBone(html[, attributes])](https://github.com/kupriyanenko/jbone/wiki/jBone#jbonehtml-attributes)

[Attributes](https://github.com/kupriyanenko/jbone/wiki/Attributes)

* [.attr(attributeName)](https://github.com/kupriyanenko/jbone/wiki/Attributes#attrattributename)
* [.attr(attributeName, value)](https://github.com/kupriyanenko/jbone/wiki/Attributes#attrattributename-value)
* [.attr(attributes)](https://github.com/kupriyanenko/jbone/wiki/Attributes#attrattributes)
* [.removeAttr(attributeName)](https://github.com/kupriyanenko/jbone/wiki/Attributes#removeattrattributename)
* [.val()](https://github.com/kupriyanenko/jbone/wiki/Attributes#val)
* [.val(value)](https://github.com/kupriyanenko/jbone/wiki/Attributes#valvalue)
* [.css(propertyName, value)](https://github.com/kupriyanenko/jbone/wiki/Attributes#csspropertyname-value)
* [.css(properties)](https://github.com/kupriyanenko/jbone/wiki/Attributes#cssproperties)
* [.addClass(className)](https://github.com/kupriyanenko/jbone/wiki/Attributes#addclassclassname)
* [.removeClass(className)](https://github.com/kupriyanenko/jbone/wiki/Attributes#removeclassclassname)
* [.toggleClass(className)](https://github.com/kupriyanenko/jbone/wiki/Attributes#toggleclassclassname)
* [.toggleClass(className, state)](https://github.com/kupriyanenko/jbone/wiki/Attributes#toggleclassclassname-state)
* [.hasClass(className)](https://github.com/kupriyanenko/jbone/wiki/Attributes#hasclassclassname)

[Data](https://github.com/kupriyanenko/jbone/wiki/Data)

* [.data(key, value)](https://github.com/kupriyanenko/jbone/wiki/Data#datakey-value)
* [.data(obj)](https://github.com/kupriyanenko/jbone/wiki/Data#dataobj)
* [.data(key)](https://github.com/kupriyanenko/jbone/wiki/Data#datakey)
* [.data()](https://github.com/kupriyanenko/jbone/wiki/Data#data)
* [.removeData(key)](https://github.com/kupriyanenko/jbone/wiki/Data#removedatakey)
* [.removeData()](https://github.com/kupriyanenko/jbone/wiki/Data#removedata)

[Event](https://github.com/kupriyanenko/jbone/wiki/Event)

* [.on(event[, selector, data], handler)](https://github.com/kupriyanenko/jbone/wiki/Event#onevent-selector-data-handler)
* [.one(event[, selector, data], handler)](https://github.com/kupriyanenko/jbone/wiki/Event#oneevent-selector-data-handler)
* [.off(event[, handler])](https://github.com/kupriyanenko/jbone/wiki/Event#offevent-handler)
* [.trigger(event)](https://github.com/kupriyanenko/jbone/wiki/Event#triggerevent)

[Manipulation](https://github.com/kupriyanenko/jbone/wiki/Manipulation)

* [.html()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#html)
* [.html(content)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#htmlcontent)
* [.append(content)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#appendcontent)
* [.appendTo(element)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#appendtoelement)
* [.empty()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#empty)
* [.remove()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#remove)

[Traversing](https://github.com/kupriyanenko/jbone/wiki/Traversing)

* [.find(selector)](https://github.com/kupriyanenko/jbone/wiki/Traversing#findselector)
* [.get(index)](https://github.com/kupriyanenko/jbone/wiki/Traversing#getindex)
* [.eq(index)](https://github.com/kupriyanenko/jbone/wiki/Traversing#eqindex)
* [.parent()](https://github.com/kupriyanenko/jbone/wiki/Traversing#parent)
* [.toArray()](https://github.com/kupriyanenko/jbone/wiki/Traversing#toarray)
* [.add(selector)](https://github.com/kupriyanenko/jbone/wiki/Traversing#addselector)
* [.add(elements)](https://github.com/kupriyanenko/jbone/wiki/Traversing#addelements)
* [.add(html)](https://github.com/kupriyanenko/jbone/wiki/Traversing#addhtml)
* [.add(selection)](https://github.com/kupriyanenko/jbone/wiki/Traversing#addselection)
* [.add(selector, context)](https://github.com/kupriyanenko/jbone/wiki/Traversing#addselector-context)

[Utilities](https://github.com/kupriyanenko/jbone/wiki/Utilities)

* [jBone.merge(first, second)](https://github.com/kupriyanenko/jbone/wiki/Utilities#jbonemergefirst-second)
* [jBone.contains(container, contained)](https://github.com/kupriyanenko/jbone/wiki/Utilities#jbonecontainscontainer-contained)
* [jBone.extend(target[, object1][, objectN])](https://github.com/kupriyanenko/jbone/wiki/Utilities#jboneextendtarget-object1-objectn)
* [jBone.makeArray(obj)](https://github.com/kupriyanenko/jbone/wiki/Utilities#jbonemakearrayobj)
* [jBone.unique(array)](https://github.com/kupriyanenko/jbone/wiki/Utilities#jboneuniquearray)

[Array methods](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Methods)

* [.pop()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/pop)
* [.push()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/push)
* [.reverse()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/reverse)
* [.shift()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/shift)
* [.sort()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/sort)
* [.splice()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/splice)
* [.unshift()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/unshift)
* [.concat()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/concat)
* [.join()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/join)
* [.slice()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/slice)
* [.indexOf()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/indexOf)
* [.forEach()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/forEach)
* [.every()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/every)
* [.some()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/some)
* [.filter()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/filter)
* [.map()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/map)
* [.reduce()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/reduce)
* [.reduceRight()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/reduceRight)

[Internals](https://github.com/kupriyanenko/jbone/wiki/Internals)

* [.pushStack(elements)](https://github.com/kupriyanenko/jbone/wiki/Internals#pushstackelements)

## Running the Tests

### Node

1. `npm install`
2. `npm test`

### Browsers

1. `bower install`
2. Open page with tests in browser `test/tests.html`
