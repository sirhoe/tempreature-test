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
    // data is compulsory, handle bad param
    data = data || {};
    // validate data
    if((typeof data.id !== 'string') || (typeof data.temperature !== 'number'))
        throw Error('id must be string and temperature must be number');
    return storageHelper.save(data.id, data.temperature);
}

