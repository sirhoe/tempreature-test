const fs = require('fs');
const temperatureLib = require('./temperatureLib')

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}

// Read the file and save the content. 
const filename = process.argv[2];
const data = fs.readFileSync(filename, 'utf8');

let jsonData;
let uniqueIds = [];
try {
    jsonData = JSON.parse(data);
} catch (err) {
    console.log(`Fail to invalid JSON file. msg: ${err.message}`)
}

jsonData.forEach((record) => {
    if(uniqueIds.indexOf(record.id) === -1) {
        uniqueIds.push(record.id);
    }
    temperatureLib.save(record);
});
console.log(`Successful in saving file ${filename} with ${jsonData.length} records and ${uniqueIds.length} unique ids.`);

//Prints statistic
uniqueIds.forEach((id) => {
    const average = temperatureLib.getAverage(id);
    const median = temperatureLib.getMedian(id);
    const mode = temperatureLib.getMode(id);
    console.log(`id: ${id} average: ${average} median: ${median} mode: ${mode}`);
});