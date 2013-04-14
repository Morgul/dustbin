# Dustbin JS

[![Build Status](https://travis-ci.org/Morgul/dustbin.png?branch=master)](https://travis-ci.org/Morgul/dustbin)

A JSON-backed object database for your web browser. It's a light wrapper around local/session storage, designed to
behave much like a standard NoSQL database. (In fact, it's design is heavily influenced by [Riak](http://basho.com/riak/),
my personal favoriate NoSQL.)

## Overview

Dustbin has the concepts of 'bins', which are loosely analogous to tables in SQL, or collections/buckets in NoSQL.
Basically, they are collections of objects able to be referenced by a name. (In fact, Dustbin simply uses an anonymous
object for each bin).

Inside each bin, objects are stored by key. Keys are _always_ strings, but they can be any key you can set on a
javascript object. The objects that are stored _must_ be able to be turned into a JSON string. That is the only
restriction. (Really, it's the cost of doing business with localStorage; it doesn't support storage of objects,
only strings and integers.)

## Usage

Using Dustbin is incredibly easy. When you include dustbin, it creates a new object on window, called `dustbin`. Here's
an example of basic usage:

```javascript
var obj = {'foo': "bar"};

// Store the object.
dustbin.store("testBin", "testObj", obj);

// Retrieve it by key.
obj = dustbin.get("testBin", "testObj");

// Alternative syntax.
obj = dustbin.get("testBin")["testObj"];
```

That's all there is to it!

## RequireJS support

Recently, I've added support for RequireJS. While it's optional (and will remain so), the support seems to work very
well. You can simply use it like any other RequireJS module:

```javascript
require(['dustbin'], function(dustbin)
{
    var key = dustbin.store("testBin", obj);
});
```

Though the support has been tested (and is part of the unit tests), I still consider the RequireJS support experimental.
If you encounter any issues, please file a ticket. (Make sure to include a test case!)

### Auto-generated Keys

You're not required to have a key to store your object under. Dustbin will automatically generate a key for you if you
don't pass one in:

```javascript
var obj = {'foo': "bar"};

// Store the object.
var key = dustbin.store("testBin", obj);

// Key will be something like: "LTMwMzk5OTQ2MA=="
console.log("Key:", key);

// Retrieve it by key.
obj = dustbin.get("testBin", key);
```

### Retrieve entire bin object

You can also retrieve the entire bin object:

```javascript
bin = dustbin.get("testBin");
```

This allows for the alternative (and in my opinion, cleaner) syntax:

```javascript
obj = dustbin.get("testBin")["testObj"];
```

### Remove an object

You can remove an object by key:

```javascript
dustbin.remove("testBin", "testObj");
```

### Remove all objects in a bin

You can even remove all objects from a bin:

```javascript
dustbin.removeAllKeys("testBin");
```

### Basic Query support

Currently, only basic query support has been added. You will need to construct an object containing `key` and `value`
where you want back a list of object that have `key` equal to `value`. Here's an example:

```javascript
var alex = {animal:"cat", name: "alex", age: 4};
var izzy = {animal:"cat", name: "izzy", age: 4};
var baal = {animal:"snake", name: "baal", age: 2};

dustbin.store("pets", alex);
dustbin.store("pets", izzy);
dustbin.store("pets", baal);

// `cats` will be equal to `[alex, izzy]`
var cats = dustbin.query("pets", {animal: "cat"});

// `pets` will be equal to `[alex, izzy, baal]`
var pets = dustbin.query("pets", {});
```

Right now the only thing supported is pure _equality_, **not** _equivalence_. Also, this is basically two nested `forEach`
calls, so performance isn't as good as it could be. I'll be looking at improving this in the future, but for now it
should meet most needs.

### Session store support

All operations can also be done on the session store. By default, the `dustbin` object's functions are simply wrappers
for `dustbin.local`. As such, you can also access the session store by using: `dustbin.session`. Here's some examples:

```javascript
var obj = {'foo': "bar"};

// Store the object.
dustbin.session.store("testBin", "testObj", obj);

// Retrieve it by key.
obj = dustbin.session.get("testBin", "testObj");

// Alternative syntax.
obj = dustbin.session.get("testBin")["testObj"];
```

As you can see, it supports all the same operations as the local storage functions. There is absolutely no difference,
except the inherent difference of session storage (all objects only last for the duration of the browser session.)

## Status

Currently, all unit tests pass, and the basic functionality is there. You can get, remove and store objects by key.
There is also basic query support, which I estimate will work for 70% of most use cases. As near as I can tell, this
code is simple enough it can be used in a production site.

That being said, I would very much like to add support for [map/reduce](http://docs.basho.com/riak/latest/tutorials/querying/MapReduce/)
and a [django-like query api](https://docs.djangoproject.com/en/dev/ref/models/querysets/#id4). I will work on that as
I have time. If you would like to implement these features, I am more than willing to accept pull requests.

## Contribution

As mentioned, I'm more than willing to accept pull requests. I will require you to follow
[my code format](https://github.com/Morgul/dustbin/wiki/Code-Style). I also reserve the rights to reject any features
that rely heavily on experimental features, or lock users into one way system for using Dustbin. (There's a readon why
the RequireJS support is optional.)

### Reporting issues

I'm more than happy to have issues reported! All that I ask is a clear description of the problem, along with a test
case. I don't have the time or inclination to wade through your application to try and discover the causes for a bug. So,
whenever possible, please try and give me a small test case (Or, preferably, a pull-request with new unit tests that
show the failure!)

That all being said, don't wait to file a bug until you have a use case. I'd rather know there's a potential issue asap;
you can feel free to file an issue, and attach the test case to it later. Just make it clear you're working on it. If
you're having trouble isolating it, I'm more than willing to lend a hand, provided I have the time. Feel free to ask.
