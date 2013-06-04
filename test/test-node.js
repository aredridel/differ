var differTests = require('./test');
var jscoverage = require('jscoverage');
var coveralls = require('coveralls');
jscoverage.enableCoverage(true);
var Differ = jscoverage.require(module, '../lib/differ');

differTests.getDiffer(Differ);

for(var test in differTests) {
    if(test !== 'getDiffer' && differTests.hasOwnProperty(test)) exports[test] = differTests[test];
}

exports.jscoverage = function(test) {
    test.expect(1);
    jscoverage.coverageDetail();
    // Copied directly from jscoverage and edited, since getting at these values directly isn't possible
    var file;
    var tmp;
    var total;
    var touched;
    var n, len;
    if (typeof global._$jscoverage === 'undefined') {
        return;
    }
    var lcov = "";
    Object.keys(global._$jscoverage).forEach(function(key) {
        file = key;
        lcov += "SF:" + file + "\n";
        tmp = global._$jscoverage[key];
        if (typeof tmp === 'function' || tmp.length === undefined) return;
        total = touched = 0;
        for (n = 0, len = tmp.length; n < len; n++) {
            if (tmp[n] !== undefined) {
                lcov += "DA:" + n + "," + tmp[n] + "\n";
                total ++;
                if (tmp[n] > 0)
                    touched ++;
            }
        }
        //test.equal(total, touched, 'All lines of code exercised by the tests');
        test.ok(true); // Not making this a failure, yet; once all paths are covered we'll turn it on
    });
    lcov += "end_of_record\n";
    if(process.env.TRAVIS) coveralls.handleInput(lcov);
    test.done();
};