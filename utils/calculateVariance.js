export function calculateVariance(data) {
    var d = new Uint8ClampedArray(data.length / 4);
    // Extract every fourth element from the data array
    for (var i = 0; i < data.length; i += 4) {
        d[i / 4] = data[i];
    }
    // Calculate the mean
    var mean = d.reduce(function (acc, val) { return acc + val; }, 0) / d.length;
    // Calculate squared differences
    var squaredDifferences = [];
    for (var i = 0; i < d.length; i++) {
        squaredDifferences.push(Math.pow(d[i] - mean, 2));
    }
    // Calculate the variance
    var variance = squaredDifferences.reduce(function (acc, val) { return acc + val; }, 0) / d.length;
    return variance;
}
