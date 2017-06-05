function mapResults(suiteName, suite) {
    let ret = {
        name: suiteName,
        benchmarks: []
    };

    for (let i = 0, il = suite.length; i < il; i++) {
        ret.benchmarks.push(mapBenchmark(suite[i]));
    }

    return ret;
}

function mapBenchmark(benchmark) {
    return {
        name: benchmark.name,
        ops: formatNumber(benchmark.hz.toFixed(benchmark.hz < 100 ? 2 : 0)),
        opsRaw: benchmark.hz,
        samples: benchmark.stats.sample.length
    };
}

function formatNumber(number) {
    number = String(number).split('.');
    return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',')
        + (number[1] ? '.' + number[1] : '')
}

module.exports = {
    mapResults: mapResults
};