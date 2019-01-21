const target = require('./statistic');

describe('helper > statistic', () => {
  it('calculates average', () => {
    const data = [1, 2, 3, 4];
    const expected = data.reduce((a, b) => a + b) / data.length;
    const result = target.calculateAverage(data);
    expect(result).toEqual(expected);
  });

  it('calculates median with even array size', () => {
    const data = [1, 2, 3, 4];
    const expected = 2.5;
    const result = target.calculateMedian(data);
    expect(result).toEqual(expected);
  });

  it('calculates median with odd array size', () => {
    const data = [1, 2, 3];
    const expected = 2;
    const result = target.calculateMedian(data);
    expect(result).toEqual(expected);
  });

  it('calculates mode with single max frequency', () => {
    const data = [1, 2, 3, 3];
    const expected = [3];
    const result = target.calculateMode(data);
    expect(result).toEqual(expected);
  });

  it('calculates mode with multiple max frequency', () => {
    const data = [1, 2, 2, 3, 3];
    const expected = [2, 3];
    const result = target.calculateMode(data);
    expect(result).toEqual(expected);
  });

  it('returns [] when all data are unique', () => {
    const data = [1, 2, 3, 4, 5, 6];
    const expected = [];
    const result = target.calculateMode(data);
    expect(result).toEqual(expected);
  });
});
