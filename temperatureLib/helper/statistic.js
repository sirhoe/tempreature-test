// Rounding by performing scaling with epsilon:
// bring figures across the decimal point
// turning the figures into a whole number to avoid floating point issues,
// then add epsilon to workaround the margin of error in floating point comparison
// then round that and translate it back.
const round = (num, points) => Math.round(num * (10 ** points) + Number.EPSILON) / (10 ** points);

exports.calculateAverage = (data) => {
  const sum = data.reduce((prev, next) => prev + next);
  return round(sum / data.length, 2);
};

exports.calculateMedian = (data) => {
  // safe check
  if (data.length === 0) return 0;

  const sorted = data.sort();
  const half = Math.floor(sorted.length / 2);

  // if its odd
  let median;
  if (sorted.length % 2) {
    median = round(sorted[half], 2);
  } else {
    median = round((sorted[half - 1] + sorted[half]) / 2, 2);
  }
  return median;
};

exports.calculateMode = (data) => {
  // use an object to count each temperature's frequency in the aray
  const freqCount = {};
  let maxFrequency = 1;
  let mode = [];
  for (let i = 0; i < data.length; i++) {
    const temperature = data[i];
    freqCount[temperature] = freqCount[temperature] ? freqCount[temperature] + 1 : 1;

    // if the new count is more than the existing max frequency
    // we have a new mode, update the new maxFrequency
    if (freqCount[temperature] > maxFrequency) {
      mode = [];
      mode.push(temperature);
      maxFrequency = freqCount[temperature];
    } else if (freqCount[temperature] === maxFrequency) {
      // if the new count is equal to the existing max
      // we have more mode
      mode.push(temperature);
    }
  }
  // in a array where all the temperature is unique
  // there is no mode
  if (maxFrequency === 1) {
    mode = [];
  }
  return mode;
};
