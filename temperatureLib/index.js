const statisticHelper = require('./helper/statistic');
const storageHelper = require('./db/datastore');

exports.getAverage = (id) => {
    const data = storageHelper.find(id);
    return statisticHelper.calculateAverage(data);
}

exports.getMedian = (id) => {
    const data = storageHelper.find(id);
    return statisticHelper.calculateMedian(data);
}

exports.getMode = (id) => {
    const data = storageHelper.find(id);
    return statisticHelper.calculateMode(data);
}

exports.save = (data) => {
    //validate data
    return storageHelper.save(data.id, data.temperature);
}

