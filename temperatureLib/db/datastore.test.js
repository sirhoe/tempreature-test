const target = require('./datastore');

describe('db > datastore', () => {
  const sampleA1 = { id: 'a', timestamp: 1510128115, temperature: 3.88 };
  const sampleA2 = { id: 'a', timestamp: 1509493642, temperature: 4.13 };
  const sampleB1 = { id: 'b', timestamp: 1509493642, temperature: 4.13 };

  afterEach(() => {
    target.resetStore();
  });

  it('saves and returns array of temperature with same id', () => {
    const result = target.save(sampleA1.id, sampleA1.temperature);
    expect(result.length).toEqual(1);
    expect(result[result.length - 1]).toEqual(sampleA1.temperature);
  });

  it('saves data with same id into same array', () => {
    target.save(sampleA1.id, sampleA1.temperature);
    const result = target.save(sampleA2.id, sampleA2.temperature);
    expect(result.length).toEqual(2);
    expect(result).toEqual(expect.arrayContaining([sampleA1.temperature]));
    expect(result).toEqual(expect.arrayContaining([sampleA2.temperature]));
  });

  it('saves same object without overwriting', () => {
    target.save(sampleA1.id, sampleA1.temperature);
    const result = target.save(sampleA1.id, sampleA1.temperature);
    expect(result.length).toEqual(2);
  });

  it('saves diff id into different array', () => {
    let result;
    result = target.save(sampleA1.id, sampleA1.temperature);
    expect(result.length).toEqual(1);
    result = target.save(sampleB1.id, sampleB1.temperature);
    expect(result.length).toEqual(1);
  });

  it('finds by id', () => {
    target.save(sampleA1.id, sampleA1.temperature);
    const result = target.find(sampleA1.id);
    expect(result.length).toEqual(1);
  });

  it('gets unique ids saved', () => {
    let result;
    target.save(sampleA1.id, sampleA1.temperature);
    result = target.getIds();
    expect(result).toEqual(expect.arrayContaining([sampleA1.id]));
    expect(result.length).toBe(1);

    target.save(sampleB1.id, sampleB1.temperature);
    result = target.getIds();
    expect(result).toEqual(expect.arrayContaining([sampleB1.id]));
    expect(result.length).toBe(2);
  });
});
