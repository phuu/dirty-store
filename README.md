# dirty-store

A quick and dirty, nestable store that converts well to a native JS object. Won't store objects.

```shell
npm install dirty-store
```

## example

```javascript
var store = require('./');

var person = Object.create(store).init({ name: 'tom' });

person.set('name', 'dave');
person.set({
  age: 24,
  skill: 'javascript'
});

person.inc('age');

person.add('computer').set('model', 'macbook');
person.for('computer').set('color', 'silver');

var dog = person.for('dog').set({
  name: 'rufus',
  breed: 'daschund',
  age: 10
});

dog.dec('age');

var personObj = person.toObject();

console.log(require('util').inspect(personObj, { depth: null, colors: true }));
```

## methods

### init(state)

Set the store up with an initial state.

Chainable.

### set(key, value)

Set the value at a particular key.

Chainable.

### set(object)

Set via an object.

Chainable.

### get(key)

Get value at key

### inc(key)

Increment value at key

Chainable.

### dec(key)

Decrement value at key

Chainable.

### add(key)

Add nested store at key

Chainable (returns new store).

### for(key)

Add and/or retrieve nested store at key.

### toObject

Return simple JS object with stored data

## test

With npm:

```shell
$ npm test
```

## License

MIT