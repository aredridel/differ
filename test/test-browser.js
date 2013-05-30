var tape = require('tape');

var tests = require('./test');

for(var key in tests) {
    if(tests.hasOwnProperty(key)) tape(key, tests[key]);
}