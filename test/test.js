var should = require('should');

var Differ = require('../../lib/differ').Differ;

var differ = new Differ();

describe('Differ', function(){

    describe('#calcDiff() / #applyDiff()', function() {

        it('changing a property value', function(done) {
            var obj1 = { prop1: 3 };
            var obj2 = { prop1: 5 };

            testDiffApply(obj1, obj2, done);
        });

        it('changing multiple property values', function(done) {
            var obj1 = { prop1: 3, prop2: 'Hello!' };
            var obj2 = { prop1: 5, prop2: 'Goodbye!' };

            testDiffApply(obj1, obj2, done);
        });

        it('adding a property', function(done) {
            var obj1 = {};
            var obj2 = { prop1: 5 };

            testDiffApply(obj1, obj2, done);
        });

        it('adding multiple properties', function(done) {
            var obj1 = {};
            var obj2 = { prop1: 5, prop2: 'Hello!' };

            testDiffApply(obj1, obj2, done);
        });

        it('removing a property', function(done) {
            var obj1 = { prop1: 5 };
            var obj2 = {};

            testDiffApply(obj1, obj2, done);
        });

        it('removing multiple properties', function(done) {
            var obj1 = { prop1: 5, prop2: 'Hello!' };
            var obj2 = {};

            testDiffApply(obj1, obj2, done);
        });

        it('removing an undefined property', function(done) {
            var obj1 = { prop1: undefined };
            var obj2 = {};

            testDiffApply(obj1, obj2, done);
        });

        it('changing a value from null', function(done) {
            var obj1 = { prop1: null };
            var obj2 = { prop1: 5 };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a value to null', function(done) {
            var obj1 = { prop1: 5 };
            var obj2 = { prop1: null };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a value from undefined', function(done) {
            var obj1 = { prop1: undefined };
            var obj2 = { prop1: 5 };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a value to undefined', function(done) {
            var obj1 = { prop1: 5 };
            var obj2 = { prop1: undefined };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a value from false', function(done) {
            var obj1 = { prop1: false };
            var obj2 = { prop1: 5 };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a value to false', function(done) {
            var obj1 = { prop1: 5 };
            var obj2 = { prop1: false };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a value from zero', function(done) {
            var obj1 = { prop1: 0 };
            var obj2 = { prop1: 5 };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a value to zero', function(done) {
            var obj1 = { prop1: 5 };
            var obj2 = { prop1: 0 };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a value from a number to a string', function(done) {
            var obj1 = { prop1: 5 };
            var obj2 = { prop1: 'Hello!' };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a value from a string to a number', function(done) {
            var obj1 = { prop1: 'Hello!' };
            var obj2 = { prop1: 5 };

            testDiffApply(obj1, obj2, done);
        });

        it('shortening a string', function(done) {
            var obj1 = { prop1: 'Hello, world!' };
            var obj2 = { prop1: 'Hello!' };

            testDiffApply(obj1, obj2, done);
        });

        it('lengthening a string', function(done) {
            var obj1 = { prop1: 'Hello!' };
            var obj2 = { prop1: 'Hello, world!' };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a string', function(done) {
            var obj1 = { prop1: 'Hello!' };
            var obj2 = { prop1: 'Goodbye!' };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a string\'s case', function(done) {
            var obj1 = { prop1: 'hello!' };
            var obj2 = { prop1: 'Hello!' };

            testDiffApply(obj1, obj2, done);
        });

        it('changing from an empty string', function(done) {
            var obj1 = { prop1: '' };
            var obj2 = { prop1: 'Hello!' };

            testDiffApply(obj1, obj2, done);
        });

        it('changing to an empty string', function(done) {
            var obj1 = { prop1: 'Hello!' };
            var obj2 = { prop1: '' };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an empty string to undefined', function(done) {
            var obj1 = { prop1: '' };
            var obj2 = { prop1: undefined };

            testDiffApply(obj1, obj2, done);
        });

        it('changing undefined to an empty string', function(done) {
            var obj1 = { prop1: undefined };
            var obj2 = { prop1: '' };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an empty string to null', function(done) {
            var obj1 = { prop1: '' };
            var obj2 = { prop1: null };

            testDiffApply(obj1, obj2, done);
        });

        it('changing null to an empty string', function(done) {
            var obj1 = { prop1: null };
            var obj2 = { prop1: '' };

            testDiffApply(obj1, obj2, done);
        });

        it('adding an object', function(done) {
            var obj1 = { };
            var obj2 = { prop1: { prop2: 'Hello!' } };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a property in an object', function(done) {
            var obj1 = { prop1: { prop2: 'Hello!' } };
            var obj2 = { prop1: { prop2: 'Goodbye!' } };

            testDiffApply(obj1, obj2, done);
        });

        it('adding a property to an object', function(done) {
            var obj1 = { prop1: { prop2: 'Hello!' } };
            var obj2 = { prop1: { prop2: 'Hello!', prop3: 5 } };

            testDiffApply(obj1, obj2, done);
        });

        it('removing a property from an object', function(done) {
            var obj1 = { prop1: { prop2: 'Hello!', prop3: 5 } };
            var obj2 = { prop1: { prop2: 'Hello!' } };

            testDiffApply(obj1, obj2, done);
        });

        it('removing an object', function(done) {
            var obj1 = { prop1: { prop2: 'Hello!' } };
            var obj2 = { };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an empty object to undefined', function(done) {
            var obj1 = { colors: {} };
            var obj2 = { colors: undefined };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an undefined property to an empty object', function(done) {
            var obj1 = { colors: undefined };
            var obj2 = { colors: {} };

            testDiffApply(obj1, obj2, done);
        });

        it('adding an array', function(done) {
            var obj1 = { };
            var obj2 = { colors: ['Red', 'Green', 'Blue'] };

            testDiffApply(obj1, obj2, done);
        });

        it('removing an array', function(done) {
            var obj1 = { colors: ['Red', 'Green', 'Blue'] };
            var obj2 = { };

            testDiffApply(obj1, obj2, done);
        });

        it('adding an element to an array', function(done) {
            var obj1 = { colors: ['Red', 'Green'] };
            var obj2 = { colors: ['Red', 'Green', 'Blue'] };

            testDiffApply(obj1, obj2, done);
        });

        it('removing an element from an array', function(done) {
            var obj1 = { colors: ['Red', 'Green', 'Blue'] };
            var obj2 = { colors: ['Red', 'Green'] };

            testDiffApply(obj1, obj2, done);
        });

        it('removing all elements from an array', function(done) {
            var obj1 = { colors: ['Red', 'Green', 'Blue'] };
            var obj2 = { colors: [] };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an array element', function(done) {
            var obj1 = { colors: ['Red', 'Green', 'Blue'] };
            var obj2 = { colors: ['Red', 'Orange', 'Blue'] };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a null array element to undefined', function(done) {
            var obj1 = { colors: ['Red', null, 'Blue'] };
            var obj2 = { colors: ['Red', undefined, 'Blue'] };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an undefined array element to null', function(done) {
            var obj1 = { colors: ['Red', undefined, 'Blue'] };
            var obj2 = { colors: ['Red', null, 'Blue'] };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an empty array to null', function(done) {
            var obj1 = { colors: [] };
            var obj2 = { colors: null };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an empty array to undefined', function(done) {
            var obj1 = { colors: [] };
            var obj2 = { colors: undefined };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an empty array to an empty object', function(done) {
            var obj1 = { colors: [] };
            var obj2 = { colors: {} };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an empty object to an empty array', function(done) {
            var obj1 = { colors: {} };
            var obj2 = { colors: [] };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an empty object to a date', function(done) {
            var obj1 = { colors: {} };
            var obj2 = { colors: new Date() };

            testDiffApply(obj1, obj2, done);
        });

        it('changing a date to an empty object', function(done) {
            var obj1 = { colors: new Date() };
            var obj2 = { colors: {} };

            testDiffApply(obj1, obj2, done);
        });

        it('changing multiple array elements', function(done) {
            var obj1 = { colors: ['Red', 'Green', 'Blue'] };
            var obj2 = { colors: ['Red', 'Orange', 'Purple'] };

            testDiffApply(obj1, obj2, done);
        });

        it('changing array element types', function(done) {
            var obj1 = { colors: ['Red', 'Green', 'Blue'] };
            var obj2 = { colors: [2, 4, 7] };

            testDiffApply(obj1, obj2, done);
        });

        it('changing array element types and length', function(done) {
            var obj1 = { colors: ['Red', 'Green', 'Blue'] };
            var obj2 = { colors: [2, 4] };

            testDiffApply(obj1, obj2, done);
        });

        it('changing an element in an object in an array', function(done) {
            var obj1 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }] };
            var obj2 = { objects: [ { color: 'Red' }, { color: 'Orange' }, { color: 'Blue' }] };

            testDiffApply(obj1, obj2, done);
        });

        it('removing an object from an array', function(done) {
            var obj1 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }] };
            var obj2 = { objects: [ { color: 'Red' }, { color: 'Green' }] };

            testDiffApply(obj1, obj2, done);
        });

        it('adding an object to an array', function(done) {
            var obj1 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }] };
            var obj2 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }, { color: 'Orange' }] };

            testDiffApply(obj1, obj2, done);
        });

        it('changing the property value in a deeply embedded object', function(done) {
            var obj1 = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 3
                        }
                    }
                }
            };
            var obj2 = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 5
                        }
                    }
                }
            };

            testDiffApply(obj1, obj2, done);
        });

        it('adding a property to a deeply embedded object', function(done) {
            var obj1 = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 3
                        }
                    }
                }
            };
            var obj2 = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 3,
                            prop5: 'Hello!'
                        }
                    }
                }
            };

            testDiffApply(obj1, obj2, done);
        });

        it('removing a property from a deeply embedded object', function(done) {
            var obj1 = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 3,
                            prop5: 'Hello!'
                        }
                    }
                }
            };
            var obj2 = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 3
                        }
                    }
                }
            };

            testDiffApply(obj1, obj2, done);
        });

        it('adding an object to a deeply embedded object', function(done) {
            var obj1 = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 3
                        }
                    }
                }
            };
            var obj2 = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 3,
                            prop5: {
                                prop6: 'Hello!'
                            }
                        }
                    }
                }
            };

            testDiffApply(obj1, obj2, done);
        });

        it('altering the structure of a deeply embedded object', function(done) {
            var obj1 = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 3
                        }
                    }
                }
            };
            var obj2 = {
                prop1: {
                    prop2: {},
                    prop3: {
                        prop4: 3,
                        prop5: 'Hello!'
                    }
                }
            };

            testDiffApply(obj1, obj2, done);
        });

        it('adding an array to a deeply embedded object', function(done) {
            var obj1 = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 3
                        }
                    }
                }
            };
            var obj2 = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 3,
                            prop5: ['Red', 'Geen', 'Blue']
                        }
                    }
                }
            };

            testDiffApply(obj1, obj2, done);
        });
    });
});

function testDiffApply(obj1, obj2, done) {
    var diff = differ.calcDiff(obj1, obj2);

    var obj3 = clone(obj1);

    differ.applyDiff(obj3, diff);

    var str2 = JSON.stringify(obj2);
    var str3 = JSON.stringify(obj3);

    str3.should.equal(str2);

    done();
}

function clone(src) {
    if (src == null || typeof(src) != 'object') {
        return src;
    }

    var c = null;

    if (src instanceof Date) {
        c = new Date(src.getTime());
    } else if (src instanceof Array) {
        c = [];
        for(var i = 0; i < src.length; i++) {
            c[i] = clone(src[i]);
        }
    } else {
        c = {};
        for(var i in src) {
            c[i] = clone(src[i]);
        }
    }

    return c;
}