# jBone 

[![Build Status](https://travis-ci.org/kupriyanenko/jbone.png?branch=master)](https://travis-ci.org/kupriyanenko/jbone)
[![Bower version](https://badge.fury.io/bo/jbone.png)](http://badge.fury.io/bo/jbone)

http://kupriyanenko.github.io/jbone/

JavaScript Library for DOM manipulation in modern browsers with jQuery-compatible API.

Replacement jQuery for Backbone in browsers (2.5kb gzipped, faster than jQuery/Zepto)

## Why jBone?

jBone is extremely small (2.5kb) and realy fast library. Main jBone idea - it's as much as possible to use native JavaScript methods in your project.

jBone it is ideal solutions for applications based on Backbone and running on mobile devices. jBone project was created to allow people using Backbone without jQuery.

## Get it

```
$ bower install jbone --save
```

Add a ```<script>``` element for jbone.js

```html
<script src="path/to/jbone/dist/jbone.js"></script>
```

## Use it

```javascript
var $input = $("<input>", {
    "class": "name"
}).val('John');

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

$('.header').addClass('loaded');
```

## AJAX, Deferred

This part is not covered on jBone. Yuo can select one of a huge amount implementations AJAX and Promises/A+.

For example: [when](https://github.com/cujojs/when), [Q](https://github.com/kriskowal/q), [simply-deferred](https://github.com/sudhirj/simply-deferred), [AJAX](microjs.com/#ajax).

Example AJAX connecting:

```javascript
// connect reqwest on your page https://rawgithub.com/ded/reqwest/master/reqwest.min.js

jBone.ajax = reqwest.compat;

$.ajax({
    url: "example.com"
});
```

Example Deferred connecting:

```javascript
// connect simply-deferred on your page https://rawgithub.com/sudhirj/simply-deferred/master/deferred.min.js

Deferred.installInto(jBone);

var deferred = $.Deferred();

$.when(deferred).then(function(response) {
    // some code
});
```

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
* [.val()](https://github.com/kupriyanenko/jbone/wiki/Attributes#val)
* [.val(value)](https://github.com/kupriyanenko/jbone/wiki/Attributes#valvalue)
* [.css(propertyName, value)](https://github.com/kupriyanenko/jbone/wiki/Attributes#csspropertyname-value)
* [.css(properties)](https://github.com/kupriyanenko/jbone/wiki/Attributes#cssproperties)

[Data](https://github.com/kupriyanenko/jbone/wiki/Data)

* [.data(key, value)](https://github.com/kupriyanenko/jbone/wiki/Data#datakey-value)
* [.data(obj)](https://github.com/kupriyanenko/jbone/wiki/Data#dataobj)
* [.data(key)](https://github.com/kupriyanenko/jbone/wiki/Data#datakey)
* [.data()](https://github.com/kupriyanenko/jbone/wiki/Data#data)

[Event](https://github.com/kupriyanenko/jbone/wiki/Event)

* [.on(event[, selector], handler)](https://github.com/kupriyanenko/jbone/wiki/Event#onevent-selector-handler)
* [.one(event[, selector], handler)](https://github.com/kupriyanenko/jbone/wiki/Event#oneevent-selector-handler)
* [.off(event[, handler])](https://github.com/kupriyanenko/jbone/wiki/Event#offevent-handler)
* [.trigger(event)](https://github.com/kupriyanenko/jbone/wiki/Event#triggerevent)

[Manipulation](https://github.com/kupriyanenko/jbone/wiki/Manipulation)

* [.html()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#html)
* [.html(content)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#htmlcontent)
* [.append(content)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#appendcontent)
* [.appendTo(target)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#appendtotarget)
* [.empty()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#empty)
* [.remove()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#remove)

[Traversing](https://github.com/kupriyanenko/jbone/wiki/Traversing)

* [.find(selector)](https://github.com/kupriyanenko/jbone/wiki/Traversing#findselector)
* [.get(index)](https://github.com/kupriyanenko/jbone/wiki/Traversing#getindex)
* [.eq(index)](https://github.com/kupriyanenko/jbone/wiki/Traversing#eqindex)
* [.parent()](https://github.com/kupriyanenko/jbone/wiki/Traversing#parent)
* [.toArray()](https://github.com/kupriyanenko/jbone/wiki/Traversing#toarray)

[Utilities](https://github.com/kupriyanenko/jbone/wiki/Utilities)

* [jBone.merge(first, second)](https://github.com/kupriyanenko/jbone/wiki/Utilities#jbonemergefirst-second)
* [jBone.contains(container, contained)](https://github.com/kupriyanenko/jbone/wiki/Utilities#jbonecontainscontainer-contained)
* [jBone.extend(target[, object1][, objectN])](https://github.com/kupriyanenko/jbone/wiki/Utilities#jboneextendtarget-object1-objectn)

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

## Running the Tests

### Node

1. ```npm install```
2. ```npm test```

### Browsers

1. ```npm install```
2. Open page with tests in browser ```test/tests.html```
