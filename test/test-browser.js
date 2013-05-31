var tape = require('tape');
var Differ = require('../lib/differ');
var differTests = require('./test');

differTests.getDiffer(Differ);

for(var key in differTests) {
    if(key !== 'getDiffer' && differTests.hasOwnProperty(key)) tape(key, differTests[key]);
}