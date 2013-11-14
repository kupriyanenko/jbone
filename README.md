# jBone 

[![Build Status](https://travis-ci.org/kupriyanenko/jbone.png?branch=master)](https://travis-ci.org/kupriyanenko/jbone)

JavaScript Library for DOM manipulation in modern browsers with with jQuery-compatible API.

Replacement jQuery for Backbone in browsers (2kb gzipped)

## Installation

Get it

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

[Event](https://github.com/kupriyanenko/jbone/wiki/Event)

* [.on(event[, selector], handler)](https://github.com/kupriyanenko/jbone/wiki/Event#onevent-selector-handler)
* [.one(event[, selector], handler)](https://github.com/kupriyanenko/jbone/wiki/Event#oneevent-selector-handler)
* [.off(event[, handler])](https://github.com/kupriyanenko/jbone/wiki/Event#offevent-handler)
* [.trigger(event)](https://github.com/kupriyanenko/jbone/wiki/Event#triggerevent)

[Manipulation](https://github.com/kupriyanenko/jbone/wiki/Manipulation)

* [.find(selector)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#findselector)
* [.get(index)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#getindex)
* [.eq(index)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#eqindex)
* [.html()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#html)
* [.html(html)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#htmlhtml)
* [.append(html)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#appendhtml)
* [.empty()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#empty)
* [.parent()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#parent)
* [.parents(element)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#parentselement)
* [.remove()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#remove)
* [.toArray()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#toarray)

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
* [.lastIndexOf()](https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
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
