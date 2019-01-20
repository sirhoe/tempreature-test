const target = require('./index');
const db = require('./db/datastore');
const statisticHelper = require('./helper/statistic');

jest.mock('./db/datastore.js');
jest.mock('./helper/statistic.js');

describe('lib', () => {
  it('throws id and temperature validation error', () => {
    expect(target.save).toThrowErrorMatchingSnapshot();
  });

  it('calls db layer .save()', () => {
    const data = { id: 'a', temperature: 55 };
    target.save(data);
    expect(db.save).toHaveBeenCalledWith(data.id, data.temperature);
  });

  it('fins by id then gcalculateet average', () => {
    const id = 'a';
    target.getAverage(id);
    expect(db.find).toHaveBeenCalledWith(id);
    expect(statisticHelper.calculateAverage).toHaveBeenCalled();
  });

  it('fins by id then calculate median', () => {
    const id = 'a';
    target.getMedian(id);
    expect(db.find).toHaveBeenCalledWith(id);
    expect(statisticHelper.calculateMedian).toHaveBeenCalled();
  });

  it('fins by id then calculate mode', () => {
    const id = 'a';
    target.getMode(id);
    expect(db.find).toHaveBeenCalledWith(id);
    expect(statisticHelper.calculateMode).toHaveBeenCalled();
  });
});
