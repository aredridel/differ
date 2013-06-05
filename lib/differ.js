
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
        Addition: 1,
        StringAppend: 2
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
                    var type1 = typeof prop1;
                    var type2 = typeof prop2;

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

                this.createDiff(diff, DiffType.Change, key, prop2);
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
                if (!prop1) {
                    if (prop2) {
                        this.createDiff(diff, DiffType.Change, key, prop2);
                    }
                    return true;
                } else {
                    if (!prop2) {
                        this.createDiff(diff, DiffType.Change, key, prop2);
                        return true;
                    }
                }

                var objType1 = this.getObjectType(prop1);
                var objType2 = this.getObjectType(prop2);

                if (objType1 !== objType2) {
                    this.createDiff(diff, DiffType.Change, key, prop2);
                    return true;
                }

                if (objType1 === ObjectType.Date) {
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
        equivalent: function(prop1, prop2) {
            if (prop1 === prop2) return true;

            var type1 = typeof prop1;
            var type2 = typeof prop2;

            if (type1 !== type2) { return false; }

            if (type1 === 'object') {
                var objType1 = this.getObjectType(prop1);
                var objType2 = this.getObjectType(prop2);

                if (objType1 !== objType2) { return false; }

                if (objType1 === ObjectType.Date) {
                    return prop1.getTime() === prop2.getTime();
                } else {
                    var prop1Keys = Object.keys(prop1);
                    var prop2Keys = Object.keys(prop2);
                    var key;

                    if (prop1Keys.length !== prop1Keys.length) {
                        return false;
                    }

                    for(var i = 0; i < prop1Keys.length; i++) {
                        key = prop1Keys[i];

                        if (!(key in prop2)) { return false; }
                        if (!this.equivalent(prop1[key], prop2[key])) { return false; }
                    }

                    for(i = 0; i < prop2Keys.length; i++) {
                        key = prop2Keys[i];

                        if (!(key in prop1)) { return false; }
                    }

                    return true;
                }
            } else {
                return prop1 === prop2;
            }

            return true;
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

                    var newObj = [];
                    keys = Object.keys(obj);
                    for(i = 0; i < keys.length; i++) {
                        key = keys[i];
                        if (!keysToDelete[key]) {
                            newObj[key] = obj[key];
                        }
                    }
                    return newObj;
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
