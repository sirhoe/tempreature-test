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
  // use another object to count each temperature's occurrence in the aray
  const temperatureOccurrencesCount = {};
  for (let i = 0; i < data.length; i++) {
    const temperature = data[i];
    temperatureOccurrencesCount[temperature] = temperatureOccurrencesCount[temperature] ? temperatureOccurrencesCount[temperature] + 1 : 1;
  }

  // loop though all temperature and its occurrences
  // compare and find the max.
  // Store max temperature in maxTemperatures (can be more than one)
  let curMaxOccurrences = 1;
  let mode = [];
  const temperatures = Object.keys(temperatureOccurrencesCount);
  for (let i = 0; i < temperatures.length; i++) {
    // object keys are in string.
    // parse to float
    const temperature = parseFloat(temperatures[i]);
    // if the temperature occurrences is more frequent
    // reset the array and save the temperature value and
    // use it occurrence to compare with the next temperature's occurrence
    if (temperatureOccurrencesCount[temperature] > curMaxOccurrences) {
      curMaxOccurrences = temperatureOccurrencesCount[temperature];
      mode = [];
      mode.push(temperature);
    } else if (temperatureOccurrencesCount[temperature] === curMaxOccurrences) {
    // if they have the same occurrences
    // save the temperature value as another mod too
      mode.push(temperature);
    }
  }
  return mode;
};
