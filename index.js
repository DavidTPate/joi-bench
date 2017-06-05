'use strict';

const fs = require('fs-wishlist').replace();
const path = require('path');

function makeSpace(len) {
    let out = '';
    for (let i = len - 1; i >= 0; i--) {
        out += ' ';
    }
    return out;
}

function runScripts(files) {
    return files.filter((file) => {
        return /\.js$/i.test(file);
    }).reduce((results, file) => {
        return require(file)
            .exec()
            .then((benchResults) => {
                results[benchResults.name] = benchResults.benchmarks;
                return results;
            });
    }, {});
}

runScripts(fs.readdirp(path.join(__dirname, 'benchmarks')))
    .then((results) => {

        let testMaxLength = 0;
        let opsMaxLength = 0;
        Object.keys(results).forEach((key) => {

            results[key].sort((lhs, rhs) => {
                testMaxLength = Math.max(lhs.name.length, rhs.name.length, testMaxLength);
                opsMaxLength = Math.max(lhs.ops.length, rhs.ops.length, opsMaxLength);
                if (lhs.opsRaw < rhs.opsRaw) {
                    return -1;
                } else if (lhs.opsRaw > rhs.opsRaw) {
                    return 1;
                }
                return 0;
            });
        });

        // After we've determined the maximum ops length and maximum test length, start displaying the results.
        Object.keys(results).forEach((key) => {

            console.log(key); // Log the suite name.
            results[key].forEach((testResult) => {
                let textResult = '';

                textResult += testResult.name
                    + makeSpace(testMaxLength - testResult.name.length)
                    + ' x '
                    + makeSpace(opsMaxLength - testResult.ops.length)
                    + testResult.ops
                    + ' ops/sec';

                console.log('  ' + textResult);
            });
        });
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });