var t = require('tap');
var dequal = require('deep-equal');

var store = require('../');

t.test('store#set', function (t) {

  var st = Object.create(store).init().for('nested');

  t.test('set number', function (t) {
    st.set('a', 10);
    t.equal(st._.a, 10, '10 is set');
    t.end();
  });

  t.test('set string', function (t) {
    st.set('b', 'fish');
    t.equal(st._.b, 'fish', 'fish is set');
    t.end();
  });

  t.test('set object fails', function (t) {
    st.set('c', { a: 10 });
    t.notOk(st._.c, 'c is not set');
    t.end();
  });

});

t.test('store#get', function (t) {

  var st = Object.create(store).init().for('nested');

  t.test('get number', function (t) {
    st.set('a', 10);
    t.equal(st._.a, st.get('a'), '10 is set');
    t.end();
  });

  t.test('get string', function (t) {
    st.set('b', 'hello');
    t.equal(st._.b, st.get('b'), 'hello is set');
    t.end();
  });

});

t.test('store#inc & store#dec', function (t) {

  var st = Object.create(store).init().for('nested');

  t.test('increment number', function (t) {
    st.set('a', 10);
    st.inc('a');
    t.equal(st._.a, 11, '10 was incremented');
    t.end();
  });

  t.test('decrement number', function (t) {
    st.set('a', 10);
    st.dec('a');
    t.equal(st._.a, 9, '10 was decremented');
    t.end();
  });

});

t.test('store#toObject', function (t) {

  var parent = Object.create(store).init()
  var st = parent.for('nested');

  st.set('a', 10);
  st.set('b', 20);
  st.for('nested').set('a', 30).set('b', 40);

  t.test('increment number', function (t) {
    t.ok(dequal(parent.toObject(), {
      nested: {
        a: 10,
        b: 20,
        nested: {
          a: 30,
          b: 40
        }
      }
    }));
    t.end();
  });

});