
if (typeof module !== "undefined" && typeof require !== "undefined") {
    var Class = global.Class = require('uberclass-clouseau');
}

(function () {
    var ObjectType = {
        Undefined: 0,
        Object: 1,
        Date: 2,
        Array: 3
    };

    var DiffType = {
        Deletion: -1,
        Change: 0,
        ChangeType: 1,
        Addition: 2,
        StringAppend: 3
    };

    var Differ = Class.extend({
        init: function() {
        },
        calcDiff: function(obj1, obj2) {
            // If same object, there is no diff
            if (obj1 === obj2) { return null; }

            var diff = {};

            // Keys in the old object, but not in the new object
            this.diffOldProperties(diff, obj1, obj2);

            // Keys in the new object, but not in the old object
            this.diffNewProperties(diff, obj1, obj2);

            return Object.keys(diff).length > 0 ? diff : null;
        },
        applyDiff: function(obj, diff) {
            if (!diff) { return obj; }

            obj = this.applyDeletions(obj, diff);

            this.applyChanges(obj, diff);
            this.applyChangeTypes(obj, diff);
            this.applyAdditions(obj, diff);
            this.applyStringAppends(obj, diff);

            return obj;
        },
        diffOldProperties: function(diff, obj1, obj2) {
            // For each key in the old object
            var keys = Object.keys(obj1);
            for(var i = 0; i < keys.length; i++) {
                var key = keys[i];

                if (key in obj2) {
                    var prop1 = obj1[key];
                    var prop2 = obj2[key];
                    var type1 = prop1 === null ? 'null' : typeof prop1;
                    var type2 = prop2 === null ? 'null' : typeof prop2;

                    if (this.diffMismatchTypes(diff, key, type1, type2, prop1, prop2)) { continue; }
                    if (this.diffStringAppend(diff, key, type1, prop1, prop2)) { continue; }
                    if (this.diffObjects(diff, key, type1, prop1, prop2)) { continue; }

                    this.diffBaseTypes(diff, key, prop1, prop2);
                } else {
                    // Property no longer in, so delete
                    this.deleteProperty(diff, key);
                }
            }
        },
        diffNewProperties: function(diff, obj1, obj2) {
            // For each key in the new object, but not in the old
            var keys = Object.keys(obj2);
            for(var i = 0; i < keys.length; i++) {
                var key = keys[i];

                if (!(key in obj1)) {
                    this.createDiff(diff, DiffType.Addition, key, obj2[key]);
                }
            }
        },
        diffMismatchTypes: function(diff, key, type1, type2, prop1, prop2) {
            if ((type1 !== type2) ||
                (type1 === 'object' && this.getObjectType(prop1) !== this.getObjectType(prop2))) {

                this.createDiff(diff, DiffType.ChangeType, key, prop2);
                return true;
            }
            return false;
        },
        diffStringAppend: function(diff, key, type1, prop1, prop2) {
            if ((type1 === 'string') && (prop2.length > prop1.length) && (prop2.substr(0, prop1.length) === prop1)) {
                var append = prop2.substr(prop1.length);
                this.createDiff(diff, DiffType.StringAppend, key, append);
                return true;
            }
            return false;
        },
        diffObjects: function(diff, key, type1, prop1, prop2) {
            if (type1 === 'object') {
                if (this.getObjectType(prop1) === ObjectType.Date) {
                    if (prop1.getTime() !== prop2.getTime()) {
                        this.createDiff(diff, DiffType.Change, key, prop2);
                    }
                    return true;
                }

                // Same object type, so delve deeper
                var propDiff = this.calcDiff(prop1, prop2);

                if (propDiff) {
                    this.createDiff(diff, DiffType.Change, key, propDiff);
                }
                return true;
            } else {
                return false;
            }
        },
        diffBaseTypes: function(diff, key, prop1, prop2) {
            if (prop1 !== prop2) {
                this.createDiff(diff, DiffType.Change, key, prop2);
            }
        },
        deleteProperty: function(diff, key) {
            if (!diff[DiffType.Deletion]) { diff[DiffType.Deletion] = []; }

            diff[DiffType.Deletion].push(key);
        },
        createDiff: function(diff, index, key, value) {
            if (!diff[index]) { diff[index] = {}; }

            diff[index][key] = value;
        },
        getObjectType: function(obj) {
            if (typeof obj !== 'object') { return ObjectType.Undefined; }
            if (obj instanceof Date) { return ObjectType.Date; }
            if (obj instanceof Array) { return ObjectType.Array; }

            return ObjectType.Object;
        },
        applyDeletions: function(obj, diff) {
            if (diff[DiffType.Deletion]) {
                var keys = diff[DiffType.Deletion];

                var i, key;

                if (this.getObjectType(obj) === ObjectType.Array) {
                    var keysToDelete = [];
                    for(i = 0; i < keys.length; i++) {
                        key = keys[i];
                        keysToDelete[key] = true;
                    }

                    keys = Object.keys(obj);

                    var temp = obj.slice();
                    obj.splice(0, obj.length);

                    for(i = 0; i < keys.length; i++) {
                        key = keys[i];
                        if (!keysToDelete[key]) {
                            obj[key] = temp[key];
                        }
                    }
                } else {
                    for(i = 0; i < keys.length; i++) {
                        key = keys[i];

                        delete obj[key];
                    }
                }
            }

            return obj;
        },
        applyChanges: function(obj, diff) {
            if (diff[DiffType.Change]) {
                var keys = Object.keys(diff[DiffType.Change]);
                for(var i = 0; i < keys.length; i++) {
                    var key = keys[i];

                    var propType = this.getObjectType(obj[key]);
                    var diffPropType = this.getObjectType(diff[DiffType.Change][key]);

                    if (obj[key] instanceof Object &&
                        diff[DiffType.Change][key] instanceof Object &&
                        (propType === ObjectType.Object || propType === ObjectType.Array) &&
                        (diffPropType === ObjectType.Object)) {

                        obj[key] = this.applyDiff(obj[key], diff[DiffType.Change][key]);
                    } else {
                        obj[key] = diff[DiffType.Change][key];
                    }
                }
            }
        },
        applyChangeTypes: function(obj, diff) {
            if (diff[DiffType.ChangeType]) {
                var keys = Object.keys(diff[DiffType.ChangeType]);
                for(var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    obj[key] = diff[DiffType.ChangeType][key];
                }
            }
        },
        applyAdditions: function(obj, diff) {
            if (diff[DiffType.Addition]) {
                var keys = Object.keys(diff[DiffType.Addition]);
                for(var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    obj[key] = diff[DiffType.Addition][key];
                }
            }
        },
        applyStringAppends: function(obj, diff) {
            if (diff[DiffType.StringAppend]) {
                var keys = Object.keys(diff[DiffType.StringAppend]);
                for(var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    obj[key] += diff[DiffType.StringAppend][key];
                }
            }
        }
    });

    if (typeof module !== "undefined" && typeof require !== "undefined") {
        module.exports = Differ;
    } else {
        /* global window */
        window.Differ = Differ;
    }
})();
