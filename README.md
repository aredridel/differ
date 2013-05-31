differ
======

[![Build Status](https://travis-ci.org/uber/differ.png?branch=master)](https://travis-ci.org/uber/differ)

[![browser support](https://ci.testling.com/uber/differ.png)](https://ci.testling.com/uber/differ)

The differ makes it easy to diff and patch simple or complex objects in Javascript.

It handles deletions, changes, additions and string appends.

## Install

    npm install differ

## Library Usage
    // This line is not needed for browser usage. When you include differ.js, Differ is
    // added to the global namespace
    var Differ = require('differ');

    var differ = new Differ();

    // Create a person object
    var person = {
        firstName: 'John',
        lastName: 'Smith',
        dateOfBirth: new Date(1970, 4, 1),
        employed: false,
        kids: [{
            name: 'Sarah',
            age: 6
        }, {
            name: 'William',
            age: 4
        }]
    };

    // Create a copy of the person object
    var updatedPerson = JSON.parse(JSON.stringify(person));

    // Make some changes to the updatedPerson object
    updatedPerson.employed = true;
    updatedPerson.favoriteColor = 'green';
    updatedPerson.kids[0].age = 7;

    // Calculate a diff between the person and updatedPerson objects
    var diff = differ.calcDiff(person, updatedPerson);

    // Create another copy of the person object
    var newPerson = JSON.parse(JSON.stringify(person));

    // Apply the diff to newPerson, which will make it equal to updatedPerson
    differ.applyDiff(newPerson, diff);

## License (MIT)

Copyright (c) 2013 by Uber Technologies, Inc, Jason Roberts, Guyon Roche

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
