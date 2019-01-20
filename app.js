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

for (let i = 0; i < jsonData.length; i++) {
    if(uniqueIds.indexOf(jsonData[i].id) === -1) {
        uniqueIds.push(jsonData[i].id);
    }
    temperatureLib.save(jsonData[i]);
};
console.log(`Successful in saving file ${filename} with ${jsonData.length} records and ${uniqueIds.length} unique ids.`);

//Prints statistic
for (let i = 0; i < uniqueIds.length; i++) {
    const average = temperatureLib.getAverage(uniqueIds[i]);
    const median = temperatureLib.getMedian(uniqueIds[i]);
    const mode = temperatureLib.getMode(uniqueIds[i]);
    console.log(`id: ${uniqueIds[i]} average: ${average} median: ${median} mode: [${mode}]`);
};