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