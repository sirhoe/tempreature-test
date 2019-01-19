// Rounding by performing scaling with epsilon:
// bring figures across the decimal point 
// turning the figures into a whole number to avoid floating point issues, 
// then add epsilon to workaround the margin of error in floating point comparison
// then round that and translate it back.
const _round = (num, points) => {
    return Math.round(num * Math.pow(10,points) + Number.EPSILON ) / Math.pow(10,points)
}

exports.calculateAverage = (data) => {
    const sum = data.reduce((prev, next)=> {
        return prev + next;
    });
    return _round(sum/data.length, 2);
}

exports.calculateMedian = (data) => {
    const sorted = data.sort();
    const middle = _round(data.length / 2, 0);
    return sorted[middle];
}