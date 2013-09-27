/**
 * quick-store
 *
 * Usage:

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

 */
var store = {
  // Initialise the store.
  // Optionally takes an initial @state object.
  init: function (state) {
    this._ = state || {};
    return this;
  },
  // Increment the value at @id.
  inc: function (id) {
    if (!this._[id]) this._[id] = 0;
    this._[id] += 1;
    return this;
  },
  // Decrement the value at @id.
  dec: function (id) {
    if (!this._[id]) this._[id] = 0;
    this._[id] -= 1;
    return this;
  },
  get: function (id) {
    return this._[id];
  },
  // Set the @val at @id, or set multiple via an object.
  set: function (id, val) {
    // Handle setting via an object
    if (typeof id === "object") {
      Object.keys(id).forEach(function (key) {
        this.set(key, id[key]);
      }.bind(this));
      return this;
    }
    // Only store primitive types
    if (typeof val === "object") return this;
    // Regular set
    this._[id] = val;
    return this;
  },
  // Add and return new store at @id.
  add: function (id) {
    this._[id] = this._[id] || Object.create(store).init();
    return this._[id];
  },
  // Grab store at @id.
  for: function (id) {
    return this.add(id);
  },
  // Recursively convert store to raw object
  toObject: function () {
    return Object.keys(this._).reduce(function (memo, key) {
      memo[key] = (this._[key].toObject ? this._[key].toObject() : this._[key]);
      return memo;
    }.bind(this), {});
  },
  // Is the store empty?
  isEmpty: function () {
    return Object.keys(this._).length === 0;
  }
};

module.exports = store;
