const target = require('./datastore');

describe('db > datastore', () => {
  const sampleA1 = {"id": "a","timestamp": 1510128115,"temperature": 3.88};
  const sampleA2 = {"id": "a","timestamp": 1509493642,"temperature": 4.13};
  const sampleB1 = {"id": "b","timestamp": 1509493642,"temperature": 4.13};

  afterEach(() => {
    target.resetStore();
  });

  it('saves and returns array of data with same id', () => {
    const result = target.save(sampleA1);
    expect(result.length).toEqual(1);
  });

  it('saves same id into same array', () => {
    target.save(sampleA1);
    const result = target.save(sampleA2);
    expect(result.length).toEqual(2);
  });

  it('saves same object without overwriting', () => {
    target.save(sampleA1);
    const result = target.save(sampleA1);
    expect(result.length).toEqual(2); 
  });

  it('saves diff id into different array', () => {
    let result;
    result = target.save(sampleA1);
    expect(result.length).toEqual(1); 
    result = target.save(sampleB1);
    expect(result.length).toEqual(1); 
  });

  it('finds by id', () => {
    target.save(sampleA1);
    const result = target.find(sampleA1.id);
    expect(result.length).toEqual(1); 
  });

  it('gets unique ids saved', () => {
    let result;
    target.save(sampleA1);
    result = target.getIds();
    expect(result).toEqual(expect.arrayContaining([sampleA1.id]));
    expect(result.length).toBe(1);

    target.save(sampleB1);
    result = target.getIds();
    expect(result).toEqual(expect.arrayContaining([sampleB1.id]));
    expect(result.length).toBe(2);
  });
});
