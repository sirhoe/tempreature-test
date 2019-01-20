let store = {};

exports.save = (id, temperature) => {
  // instantiate to array if id is new
  if (store[id] === undefined) {
    store[id] = [];
  }
  store[id].push(temperature);
  return store[id];
};

exports.find = (id) => {
  let result = [];
  if (store.hasOwnProperty(id)) {
    result = store[id];
  }
  return result;
};

exports.getIds = () => {
  const ids = [];
  for (const prop in store) {
    ids.push(prop);
  }
  return ids;
};

exports.resetStore = () => {
  store = {};
};
