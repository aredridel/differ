var Differ;
var clone = require('clone');

function bootstrap(test) {
    test.expect = test.expect || test.plan;
    test.done = test.done || test.end;
}

function testDiffApply(obj1, obj2, test) {
    bootstrap(test);
    test.expect(1);

    var differ = new Differ();
    var diff = differ.calcDiff(obj1, obj2);

    var obj3 = clone(obj1);

    differ.applyDiff(obj3, diff);

    test.equal(JSON.stringify(obj3), JSON.stringify(obj2), 'The objects are not equal.');

    test.done();
}

exports.getDiffer = function(difObj) {
    Differ = difObj;
};

exports.changePropertyValue = function(test) {
    var obj1 = { prop1: 3 };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test);
};

exports.changeMultiplePropertyValues = function(test) {
    var obj1 = { prop1: 3, prop2: 'Hello!' };
    var obj2 = { prop1: 5, prop2: 'Goodbye!' };

    testDiffApply(obj1, obj2, test);
};

exports.addAProperty = function(test) {
    var obj1 = {};
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test);
};

exports.addMultipleProperties = function(test) {
    var obj1 = {};
    var obj2 = { prop1: 5, prop2: 'Hello!' };

    testDiffApply(obj1, obj2, test);
};

exports.removeAProperty = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = {};

    testDiffApply(obj1, obj2, test);
};

exports.removeMultipleProperties = function(test) {
    var obj1 = { prop1: 5, prop2: 'Hello!' };
    var obj2 = {};

    testDiffApply(obj1, obj2, test);
};

exports.removeAnUndefinedProperty = function(test) {
    var obj1 = { prop1: undefined };
    var obj2 = {};

    testDiffApply(obj1, obj2, test);
};

exports.changeAValueFromNull = function(test) {
    var obj1 = { prop1: null };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test);
};

exports.changeAValueToNull = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = { prop1: null };

    testDiffApply(obj1, obj2, test);
};

exports.changeAValueFromUndefined = function(test) {
    var obj1 = { prop1: undefined };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test);
};

exports.changeAValueToUndefined = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = { prop1: undefined };

    testDiffApply(obj1, obj2, test);
};

exports.changeAValueFromFalse = function(test) {
    var obj1 = { prop1: false };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test);
};

exports.changeAValueToFalse = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = { prop1: false };

    testDiffApply(obj1, obj2, test);
};

exports.changeAValueFromZero = function(test) {
    var obj1 = { prop1: 0 };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test);
};

exports.changeAValueToZero = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = { prop1: 0 };

    testDiffApply(obj1, obj2, test);
};

exports.changeAValueFromANumberToAString = function(test) {
    var obj1 = { prop1: 5 };
    var obj2 = { prop1: 'Hello!' };

    testDiffApply(obj1, obj2, test);
};

exports.changeAValueFromAStringToANumber = function(test) {
    var obj1 = { prop1: 'Hello!' };
    var obj2 = { prop1: 5 };

    testDiffApply(obj1, obj2, test);
};

exports.shortenAString = function(test) {
    var obj1 = { prop1: 'Hello, world!' };
    var obj2 = { prop1: 'Hello!' };

    testDiffApply(obj1, obj2, test);
};

exports.lengthenAString = function(test) {
    var obj1 = { prop1: 'Hello!' };
    var obj2 = { prop1: 'Hello, world!' };

    testDiffApply(obj1, obj2, test);
};

exports.changeAString = function(test) {
    var obj1 = { prop1: 'Hello!' };
    var obj2 = { prop1: 'Goodbye!' };

    testDiffApply(obj1, obj2, test);
};

exports.changeAStringsCase = function(test) {
    var obj1 = { prop1: 'hello!' };
    var obj2 = { prop1: 'Hello!' };

    testDiffApply(obj1, obj2, test);
};

exports.changeFromAnEmptyString = function(test) {
    var obj1 = { prop1: '' };
    var obj2 = { prop1: 'Hello!' };

    testDiffApply(obj1, obj2, test);
};

exports.changeToAnEmptyString = function(test) {
    var obj1 = { prop1: 'Hello!' };
    var obj2 = { prop1: '' };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnEmptyStringToUndefined = function(test) {
    var obj1 = { prop1: '' };
    var obj2 = { prop1: undefined };

    testDiffApply(obj1, obj2, test);
};

exports.changeUndefinedToAnEmptyString = function(test) {
    var obj1 = { prop1: undefined };
    var obj2 = { prop1: '' };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnEmptyStringToNull = function(test) {
    var obj1 = { prop1: '' };
    var obj2 = { prop1: null };

    testDiffApply(obj1, obj2, test);
};

exports.changeNullToAnEmptyString = function(test) {
    var obj1 = { prop1: null };
    var obj2 = { prop1: '' };

    testDiffApply(obj1, obj2, test);
};

exports.changeNullToAnEmptyObject = function(test) {
    var obj1 = { prop1: null };
    var obj2 = { prop1: { prop2: {} } };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnEmptyObjectToNull = function(test) {
    var obj1 = { prop1: { prop2: {} } };
    var obj2 = { prop1: null };

    testDiffApply(obj1, obj2, test);
};

exports.changeNullToAnObject = function(test) {
    var obj1 = { prop1: null };
    var obj2 = { prop1: { prop2: 'Hello!' } };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnObjectToNull = function(test) {
    var obj1 = { prop1: { prop2: 'Hello!' } };
    var obj2 = { prop1: null };

    testDiffApply(obj1, obj2, test);
};

exports.changeUndefinedToAnEmptyObject = function(test) {
    var obj1 = { prop1: undefined };
    var obj2 = { prop1: { prop2: {} } };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnEmptyObjectToUndefined = function(test) {
    var obj1 = { prop1: { prop2: {} } };
    var obj2 = { prop1: undefined };

    testDiffApply(obj1, obj2, test);
};

exports.changeUndefinedToAnObject = function(test) {
    var obj1 = { prop1: undefined };
    var obj2 = { prop1: { prop2: 'Hello!' } };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnObjectToUndefined = function(test) {
    var obj1 = { prop1: { prop2: 'Hello!' } };
    var obj2 = { prop1: undefined };

    testDiffApply(obj1, obj2, test);
};

exports.addAnObject = function(test) {
    var obj1 = { };
    var obj2 = { prop1: { prop2: 'Hello!' } };

    testDiffApply(obj1, obj2, test);
};

exports.changeAPropertyInAnObject = function(test) {
    var obj1 = { prop1: { prop2: 'Hello!' } };
    var obj2 = { prop1: { prop2: 'Goodbye!' } };

    testDiffApply(obj1, obj2, test);
};

exports.addAPropertyToAnObject = function(test) {
    var obj1 = { prop1: { prop2: 'Hello!' } };
    var obj2 = { prop1: { prop2: 'Hello!', prop3: 5 } };

    testDiffApply(obj1, obj2, test);
};

exports.removeAPropertyFromAnObject = function(test) {
    var obj1 = { prop1: { prop2: 'Hello!', prop3: 5 } };
    var obj2 = { prop1: { prop2: 'Hello!' } };

    testDiffApply(obj1, obj2, test);
};

exports.removeAnObject = function(test) {
    var obj1 = { prop1: { prop2: 'Hello!' } };
    var obj2 = { };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnEmptyObjectToUndefined = function(test) {
    var obj1 = { colors: {} };
    var obj2 = { colors: undefined };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnUndefinedPropertyToAnEmptyObject = function(test) {
    var obj1 = { colors: undefined };
    var obj2 = { colors: {} };

    testDiffApply(obj1, obj2, test);
};

exports.addAnArray = function(test) {
    var obj1 = { };
    var obj2 = { colors: ['Red', 'Green', 'Blue'] };

    testDiffApply(obj1, obj2, test);
};

exports.removeAnArray = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { };

    testDiffApply(obj1, obj2, test);
};

exports.addAnElementToAnArray = function(test) {
    var obj1 = { colors: ['Red', 'Green'] };
    var obj2 = { colors: ['Red', 'Green', 'Blue'] };

    testDiffApply(obj1, obj2, test);
};

exports.removeAnElementFromAnArray = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: ['Red', 'Green'] };

    testDiffApply(obj1, obj2, test);
};

exports.removeAllElementsFromAnArray = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: [] };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnArrayElement = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: ['Red', 'Orange', 'Blue'] };

    testDiffApply(obj1, obj2, test);
};

exports.changeANullArrayElementToUndefined = function(test) {
    var obj1 = { colors: ['Red', null, 'Blue'] };
    var obj2 = { colors: ['Red', undefined, 'Blue'] };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnUndefinedArrayElementToNull = function(test) {
    var obj1 = { colors: ['Red', undefined, 'Blue'] };
    var obj2 = { colors: ['Red', null, 'Blue'] };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnEmptyArrayToNull = function(test) {
    var obj1 = { colors: [] };
    var obj2 = { colors: null };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnEmptyArrayToUndefined = function(test) {
    var obj1 = { colors: [] };
    var obj2 = { colors: undefined };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnEmptyArrayToAnEmptyObject = function(test) {
    var obj1 = { colors: [] };
    var obj2 = { colors: {} };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnEmptyObjectToAnEmptyArray = function(test) {
    var obj1 = { colors: {} };
    var obj2 = { colors: [] };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnEmptyObjectToADate = function(test) {
    var obj1 = { colors: {} };
    var obj2 = { colors: new Date() };

    testDiffApply(obj1, obj2, test);
};

exports.changeADateToAnEmptyObject = function(test) {
    var obj1 = { colors: new Date() };
    var obj2 = { colors: {} };

    testDiffApply(obj1, obj2, test);
};

exports.changeMultipleArrayElements = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: ['Red', 'Orange', 'Purple'] };

    testDiffApply(obj1, obj2, test);
};

exports.changeArrayElementTypes = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: [2, 4, 7] };

    testDiffApply(obj1, obj2, test);
};

exports.changeArrayElementTypesAndLength = function(test) {
    var obj1 = { colors: ['Red', 'Green', 'Blue'] };
    var obj2 = { colors: [2, 4] };

    testDiffApply(obj1, obj2, test);
};

exports.changeAnElementInAnObjectInAnArray = function(test) {
    var obj1 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }] };
    var obj2 = { objects: [ { color: 'Red' }, { color: 'Orange' }, { color: 'Blue' }] };

    testDiffApply(obj1, obj2, test);
};

exports.removeAnObjectFromAnArray = function(test) {
    var obj1 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }] };
    var obj2 = { objects: [ { color: 'Red' }, { color: 'Green' }] };

    testDiffApply(obj1, obj2, test);
};

exports.addAnObjectToAnArray = function(test) {
    var obj1 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }] };
    var obj2 = { objects: [ { color: 'Red' }, { color: 'Geen' }, { color: 'Blue' }, { color: 'Orange' }] };

    testDiffApply(obj1, obj2, test);
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

    testDiffApply(obj1, obj2, test);
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

    testDiffApply(obj1, obj2, test);
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

    testDiffApply(obj1, obj2, test);
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

    testDiffApply(obj1, obj2, test);
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

    testDiffApply(obj1, obj2, test);
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

    testDiffApply(obj1, obj2, test);
};

exports.changeDateValues = function(test) {
    var obj1 = { prop1: new Date(2013, 7, 4, 10, 30, 0) };
    var obj2 = { prop1: new Date(2013, 8, 5, 12, 45, 30) };

    testDiffApply(obj1, obj2, test);
};

exports.changeFromAnObjectToADate = function(test) {
    var obj1 = { prop1: {} };
    var obj2 = { prop1: new Date(2013, 8, 5, 12, 45, 30) };

    testDiffApply(obj1, obj2, test);
};

exports.changeFromADateToAnObject = function(test) {
    var obj1 = { prop1: {} };
    var obj2 = { prop1: new Date(2013, 8, 5, 12, 45, 30) };

    testDiffApply(obj1, obj2, test);
};

exports.changeFromUndefinedToADate = function(test) {
    var obj1 = { prop1: undefined };
    var obj2 = { prop1: new Date(2013, 8, 5, 12, 45, 30) };

    testDiffApply(obj1, obj2, test);
};

exports.changeFromNullToADate = function(test) {
    var obj1 = { prop1: null };
    var obj2 = { prop1: new Date(2013, 8, 5, 12, 45, 30) };

    testDiffApply(obj1, obj2, test);
};

exports.changeFromDateToUndefined = function(test) {
    var obj1 = { prop1: new Date(2013, 7, 4, 10, 30, 0) };
    var obj2 = { prop1: undefined };

    testDiffApply(obj1, obj2, test);
};

exports.changeFromDateToNull = function(test) {
    var obj1 = { prop1: new Date(2013, 7, 4, 10, 30, 0) };
    var obj2 = { prop1: null };

    testDiffApply(obj1, obj2, test);
};

exports.changeFromStringToDate = function(test) {
    var obj1 = { prop1: '2013-07-04 10:30:00 GMT' };
    var obj2 = { prop1: new Date(2013, 7, 4, 10, 30, 0) };

    testDiffApply(obj1, obj2, test);
};

exports.changeFromNumberToDate = function(test) {
    var obj1 = { prop1: 2013 };
    var obj2 = { prop1: new Date(2013, 7, 4, 10, 30, 0) };

    testDiffApply(obj1, obj2, test);
};

exports.changeFromDateToString = function(test) {
    var obj1 = { prop1: new Date(2013, 7, 4, 10, 30, 0) };
    var obj2 = { prop1: '2013-07-04 10:30:00 GMT' };

    testDiffApply(obj1, obj2, test);
};

exports.changeFromDateToNumber = function(test) {
    var obj1 = { prop1: new Date(2013, 7, 4, 10, 30, 0) };
    var obj2 = { prop1: 2013 };

    testDiffApply(obj1, obj2, test);
};

exports.removeElementFromSimpleArray = function(test) {
    var obj1 = ['Red', 'Green', 'Blue'];
    var obj2 = ['Red', 'Green'];

    testDiffApply(obj1, obj2, test);
};

exports.addElementToSimpleArray = function(test) {
    var obj1 = ['Red', 'Green'];
    var obj2 = ['Red', 'Green', 'Blue'];

    testDiffApply(obj1, obj2, test);
};

exports.changeSimpleArrayToNull = function(test) {
    var obj1 = ['Red', 'Green', 'Blue'];
    var obj2 = null;

    testDiffApply(obj1, obj2, test);
};

exports.changeNullToSimpleArray = function(test) {
    var obj1 = null;
    var obj2 = ['Red', 'Green', 'Blue'];

    testDiffApply(obj1, obj2, test);
};

exports.changeSimpleArrayToUndefined = function(test) {
    var obj1 = ['Red', 'Green', 'Blue'];
    var obj2;

    testDiffApply(obj1, obj2, test);
};

exports.changeUndefinedToSimpleArray = function(test) {
    var obj1;
    var obj2 = ['Red', 'Green', 'Blue'];

    testDiffApply(obj1, obj2, test);
};

exports.changeSimpleArrayToEmptyObject = function(test) {
    var obj1 = ['Red', 'Green', 'Blue'];
    var obj2 = {};

    testDiffApply(obj1, obj2, test);
};

exports.changeEmptyObjectToSimpleArray = function(test) {
    var obj1 = {};
    var obj2 = ['Red', 'Green', 'Blue'];

    testDiffApply(obj1, obj2, test);
};

exports.changeSimpleArrayToHash = function(test) {
    var obj1 = ['Red', 'Green', 'Blue'];
    var obj2 = { 'Red': 1, 'Green': 2, 'Blue': 3 };

    testDiffApply(obj1, obj2, test);
};

exports.changeHashToSimpleArray = function(test) {
    var obj1 = { 'Red': 1, 'Green': 2, 'Blue': 3 };
    var obj2 = ['Red', 'Green', 'Blue'];

    testDiffApply(obj1, obj2, test);
};

exports.changeSimpleArrayToDate = function(test) {
    var obj1 = ['Red', 'Green', 'Blue'];
    var obj2 = new Date(2013, 8, 5, 12, 45, 30);

    testDiffApply(obj1, obj2, test);
};

exports.changeDateToSimpleArray = function(test) {
    var obj1 = new Date(2013, 8, 5, 12, 45, 30);
    var obj2 = ['Red', 'Green', 'Blue'];

    testDiffApply(obj1, obj2, test);
};

exports.changeSimpleArrayToSimpleTwoDimensionalArray = function(test) {
    var obj1 = ['Red', 'Green', 'Blue'];
    var obj2 = ['Red', [1, 2, 3], 'Blue'];

    testDiffApply(obj1, obj2, test);
};

exports.changeSimpleTwoDimensionalArrayToSimpleArray = function(test) {
    var obj1 = ['Red', [1, 2, 3], 'Blue'];
    var obj2 = ['Red', 'Green', 'Blue'];

    testDiffApply(obj1, obj2, test);
};
