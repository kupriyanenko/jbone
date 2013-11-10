# jBone [![Build Status](https://travis-ci.org/kupriyanenko/jbone.png?branch=master)](https://travis-ci.org/kupriyanenko/jbone)

JavaScript Library for DOM manipulation. Replacement jQuery for Backbone (gzipped:  1kb)

## Installation

Get it

    $ bower install jbone --save

Add a ```<script>``` element for jbone.js

    <script src="path/to/jbone/jbone.js"></script>

## API

[jBone](https://github.com/kupriyanenko/jbone/wiki/jBone)

* [jBone(selector)](https://github.com/kupriyanenko/jbone/wiki/jBone#jboneselector)
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
* [.appendTo(element)](https://github.com/kupriyanenko/jbone/wiki/Manipulation#appendtoelement)
* [.empty()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#empty)
* [.remove()](https://github.com/kupriyanenko/jbone/wiki/Manipulation#remove)

## Running the Tests

### Node

1. ```npm install```
2. ```npm test```

### Browsers

1. ```npm install```
2. Open page with tests in browser ```test/tests.html```

    

