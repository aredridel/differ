var clone = require('clone');
var Differ = require('../lib/differ');

function testDiffApply(obj1, obj2, test, message) {
    test.expect(1);

    var differ = new Differ();
    var diff = differ.calcDiff(obj1, obj2);

    var obj3 = clone(obj1);

    differ.applyDiff(obj3, diff);

    test.deepEqual(obj3, obj2, message);

    test.done();
}

exports.changePropertyValue = function(test) {
    var obj1 = { prop1: 3 };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test, 'changing a property value');
};

exports.changeMultiplePropertyValues = function(test) {
    var obj1 = { prop1: 3, prop2: 'Hello!' };
    var obj2 = { prop1: 5, prop2: 'Goodbye!' };

    testDiffApply(obj1, obj2, test, 'changing multiple property values');
};

exports.addAProperty = function(test) {
    var obj1 = {};
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test, 'adding a property');
};

exports.addMultipleProperties = function(test) {
    var obj1 = {};
    var obj2 = { prop1: 5, prop2: 'Hello!' };

    testDiffApply(obj1, obj2, test, 'adding multiple properties');
};

exports.removeAProperty = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = {};

    testDiffApply(obj1, obj2, test, 'removing a property');
};

exports.removeMultipleProperties = function(test) {
    var obj1 = { prop1: 5, prop2: 'Hello!' };
    var obj2 = {};

    testDiffApply(obj1, obj2, test, 'removing multiple properties');
};

exports.removeAnUndefinedProperty = function(test) {
    var obj1 = { prop1: undefined };
    var obj2 = {};

    testDiffApply(obj1, obj2, test, 'removing an undefined property');
};

exports.changeAValueFromNull = function(test) {
    var obj1 = { prop1: null };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test, 'changing a value from null');
};

exports.changeAValueToNull = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = { prop1: null };

    testDiffApply(obj1, obj2, test, 'changing a value to null');
};

exports.changeAValueFromUndefined = function(test) {
    var obj1 = { prop1: undefined };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test, 'changing a value from undefined');
};

exports.changeAValueToUndefined = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = { prop1: undefined };

    testDiffApply(obj1, obj2, test, 'changing a value to undefined');
};

exports.changeAValueFromFalse = function(test) {
    var obj1 = { prop1: false };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test, 'changing a value from false');
};

exports.changeAValueToFalse = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = { prop1: false };

    testDiffApply(obj1, obj2, test, 'changing a value to false');
};

exports.changeAValueFromZero = function(test) {
    var obj1 = { prop1: 0 };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test, 'changing a value from zero');
};

exports.changeAValueToZero = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = { prop1: 0 };

    testDiffApply(obj1, obj2, test, 'changing a value to zero');
};

exports.changeAValueFromANumberToAString = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = { prop1: 'Hello!' };

    testDiffApply(obj1, obj2, test, 'changing a value from a number to a string');
};

exports.changeAValueFromAStringToANumber = function(test) {
    var obj1 = { prop1: 'Hello!' };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test, 'changing a value from a string to a number');
};

exports.shortenAString = function(test) {
    var obj1 = { prop1: 'Hello, world!' };
    var obj2 = { prop1: 'Hello!' };

    testDiffApply(obj1, obj2, test, 'shortening a string');
};

exports.lengthenAString = function(test) {
    var obj1 = { prop1: 'Hello!' };
    var obj2 = { prop1: 'Hello, world!' };

    testDiffApply(obj1, obj2, test, 'lengthening a string');
};

exports.changeAString = function(test) {
    var obj1 = { prop1: 'Hello!' };
    var obj2 = { prop1: 'Goodbye!' };

    testDiffApply(obj1, obj2, test, 'changing a string');
};

exports.changeAStringsCase = function(test) {
    var obj1 = { prop1: 'hello!' };
    var obj2 = { prop1: 'Hello!' };

    testDiffApply(obj1, obj2, test, 'changing a string\'s case');
};

exports.changeFromAnEmptyString = function(test) {
    var obj1 = { prop1: '' };
    var obj2 = { prop1: 'Hello!' };

    testDiffApply(obj1, obj2, test, 'changing from an empty string');
};

exports.changeToAnEmptyString = function(test) {
    var obj1 = { prop1: 'Hello!' };
    var obj2 = { prop1: '' };

    testDiffApply(obj1, obj2, test, 'changing to an empty string');
};

exports.changeAnEmptyStringToUndefined = function(test) {
    var obj1 = { prop1: '' };
    var obj2 = { prop1: undefined };

    testDiffApply(obj1, obj2, test, 'changing an empty string to undefined');
};

exports.changeUndefinedToAnEmptyString = function(test) {
    var obj1 = { prop1: undefined };
    var obj2 = { prop1: '' };

    testDiffApply(obj1, obj2, test, 'changing undefined to an empty string');
};

exports.changeAnEmptyStringToNull = function(test) {
    var obj1 = { prop1: '' };
    var obj2 = { prop1: null };

    testDiffApply(obj1, obj2, test, 'changing an empty string to null');
};

exports.changeNullToAnEmptyString = function(test) {
    var obj1 = { prop1: null };
    var obj2 = { prop1: '' };

    testDiffApply(obj1, obj2, test, 'changing null to an empty string');
};

exports.addAnObject = function(test) {
    var obj1 = { };
    var obj2 = { prop1: { prop2: 'Hello!' } };

    testDiffApply(obj1, obj2, test, 'adding an object');
};

exports.changeAPropertyInAnObject = function(test) {
    var obj1 = { prop1: { prop2: 'Hello!' } };
    var obj2 = { prop1: { prop2: 'Goodbye!' } };

    testDiffApply(obj1, obj2, test, 'changing a property in an object');
};

exports.addAPropertyToAnObject = function(test) {
    var obj1 = { prop1: { prop2: 'Hello!' } };
    var obj2 = { prop1: { prop2: 'Hello!', prop3: 5 } };

    testDiffApply(obj1, obj2, test, 'adding a property to an object');
};

exports.removeAPropertyFromAnObject = function(test) {
    var obj1 = { prop1: { prop2: 'Hello!', prop3: 5 } };
    var obj2 = { prop1: { prop2: 'Hello!' } };

    testDiffApply(obj1, obj2, test, 'removing a property from an object');
};

exports.removeAnObject = function(test) {
    var obj1 = { prop1: { prop2: 'Hello!' } };
    var obj2 = { };

    testDiffApply(obj1, obj2, test, 'removing an object');
};

exports.changeAnEmptyObjectToUndefined = function(test) {
    var obj1 = { colors: {} };
    var obj2 = { colors: undefined };

    testDiffApply(obj1, obj2, test, 'changing an empty object to undefined');
};

exports.changeAnUndefinedPropertyToAnEmptyObject = function(test) {
    var obj1 = { colors: undefined };
    var obj2 = { colors: {} };

    testDiffApply(obj1, obj2, test, 'changing an undefined property to an empty object');
};

exports.addAnArray = function(test) {
    var obj1 = { };
    var obj2 = { colors: ['Red', 'Green', 'Blue'] };

    testDiffApply(obj1, obj2, test, 'adding an array');
};

exports.removeAnArray = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { };

    testDiffApply(obj1, obj2, test, 'removing an array');
};

exports.addAnElementToAnArray = function(test) {
    var obj1 = { colors: ['Red', 'Green'] };
    var obj2 = { colors: ['Red', 'Green', 'Blue'] };

    testDiffApply(obj1, obj2, test, 'adding an element to an array');
};

exports.removeAnElementFromAnArray = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: ['Red', 'Green'] };

    testDiffApply(obj1, obj2, test, 'removing an element from an array');
};

exports.removeAllElementsFromAnArray = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: [] };

    testDiffApply(obj1, obj2, test, 'removing all elements from an array');
};

exports.changeAnArrayElement = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: ['Red', 'Orange', 'Blue'] };

    testDiffApply(obj1, obj2, test, 'changing an array element');
};

exports.changeANullArrayElementToUndefined = function(test) {
    var obj1 = { colors: ['Red', null, 'Blue'] };
    var obj2 = { colors: ['Red', undefined, 'Blue'] };

    testDiffApply(obj1, obj2, test, 'changing a null array element to undefined');
};

exports.changeAnUndefinedArrayElementToNull = function(test) {
    var obj1 = { colors: ['Red', undefined, 'Blue'] };
    var obj2 = { colors: ['Red', null, 'Blue'] };

    testDiffApply(obj1, obj2, test, 'changing an undefined array element to null');
};

exports.changeAnEmptyArrayToNull = function(test) {
    var obj1 = { colors: [] };
    var obj2 = { colors: null };

    testDiffApply(obj1, obj2, test, 'changing an empty array to null');
};

exports.changeAnEmptyArrayToUndefined = function(test) {
    var obj1 = { colors: [] };
    var obj2 = { colors: undefined };

    testDiffApply(obj1, obj2, test, 'changing an empty array to undefined');
};

exports.changeAnEmptyArrayToAnEmptyObject = function(test) {
    var obj1 = { colors: [] };
    var obj2 = { colors: {} };

    testDiffApply(obj1, obj2, test, 'changing an empty array to an empty object');
};

exports.changeAnEmptyObjectToAnEmptyArray = function(test) {
    var obj1 = { colors: {} };
    var obj2 = { colors: [] };

    testDiffApply(obj1, obj2, test, 'changing an empty object to an empty array');
};

exports.changeAnEmptyObjectToADate = function(test) {
    var obj1 = { colors: {} };
    var obj2 = { colors: new Date() };

    testDiffApply(obj1, obj2, test, 'changing an empty object to a date');
};

exports.changeADateToAnEmptyObject = function(test) {
    var obj1 = { colors: new Date() };
    var obj2 = { colors: {} };

    testDiffApply(obj1, obj2, test, 'changing a date to an empty object');
};

exports.changeMultipleArrayElements = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: ['Red', 'Orange', 'Purple'] };

    testDiffApply(obj1, obj2, test, 'changing multiple array elements');
};

exports.changeArrayElementTypes = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: [2, 4, 7] };

    testDiffApply(obj1, obj2, test, 'changing array element types');
};

exports.changeArrayElementTypesAndLength = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: [2, 4] };

    testDiffApply(obj1, obj2, test, 'changing array element types and length');
};

exports.changeAnElementInAnObjectInAnArray = function(test) {
    var obj1 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }] };
    var obj2 = { objects: [ { color: 'Red' }, { color: 'Orange' }, { color: 'Blue' }] };

    testDiffApply(obj1, obj2, test, 'changing an element in an object in an array');
};

exports.removeAnObjectFromAnArray = function(test) {
    var obj1 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }] };
    var obj2 = { objects: [ { color: 'Red' }, { color: 'Green' }] };

    testDiffApply(obj1, obj2, test, 'removing an object from an array');
};

exports.addAnObjectToAnArray = function(test) {
    var obj1 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }] };
    var obj2 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }, { color: 'Orange' }] };

    testDiffApply(obj1, obj2, test, 'adding an object to an array');
};

exports.changeThePropertyValueInADeeplyEmbeddedObject = function(test) {
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

    testDiffApply(obj1, obj2, test, 'changing the property value in a deeply embedded object');
};

exports.addAPropertyToADeeplyEmbeddedObject = function(test) {
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

    testDiffApply(obj1, obj2, test, 'adding a property to a deeply embedded object');
};

exports.removeAPropertyFromADeeplyEmbeddedObject = function(test) {
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

    testDiffApply(obj1, obj2, test, 'removing a property from a deeply embedded object');
};

exports.addAnObjectToADeeplyEmbeddedObject = function(test) {
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

    testDiffApply(obj1, obj2, test, 'adding an object to a deeply embedded object');
};

exports.alteringTheStructureOfADeeplyEmbeddedObject = function(test) {
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

    testDiffApply(obj1, obj2, test, 'altering the structure of a deeply embedded object');
};

exports.addingAnArrayToADeeplyEmbeddedObject = function(test) {
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

    testDiffApply(obj1, obj2, test, 'adding an array to a deeply embedded object');
};
