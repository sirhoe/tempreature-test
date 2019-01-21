const fs = require('fs');
const temperatureLib = require('./temperatureLib');

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log(`Usage: node ${process.argv[1]} FILENAME`);
  process.exit(1);
}

// Read the file
const filename = process.argv[2];
let data;
try {
   data = fs.readFileSync(filename, 'utf8');
} catch (err) {
  console.log(`Fail to parse ${filename}. ${err.message}`);
  process.exit(1);
}

// Parse into JSON
let jsonData;
const uniqueIds = [];
try {
  jsonData = JSON.parse(data);
} catch (err) {
  console.log(`Fail to parse JSON file. ${err.message}`);
  process.exit(1);
}

// Saves the data and keep track of the unique ids
for (let i = 0; i < jsonData.length; i++) {
  if (uniqueIds.indexOf(jsonData[i].id) === -1) {
    uniqueIds.push(jsonData[i].id);
  }
  try {
    temperatureLib.save(jsonData[i]);
  } catch (err) {
    console.log(`Fail to save data. ${err.message}`);
    process.exit(1);
  }
}

// Calculate average, median and mode and prints the result
const result = [];
for (let i = 0; i < uniqueIds.length; i++) {
  const id = uniqueIds[i];
  const average = temperatureLib.getAverage(id);
  const median = temperatureLib.getMedian(id);
  const mode = temperatureLib.getMode(id);
  result.push({
    id,
    average,
    median,
    mode,
  });
}
console.log(JSON.stringify(result));
process.exit(0);
