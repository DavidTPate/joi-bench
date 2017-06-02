'use strict';

const fs = require('fs-wishlist').replace();
const path = require('path');

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
    .then((res) => {
        console.log(res);
        process.exit(0);
    });