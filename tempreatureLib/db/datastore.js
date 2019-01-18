let store = [];

exports.save = (data) => {
    // instantiate to array if id is saved for the first time
    if(store[data.id] == undefined) {
        store[data.id] = []
    } 
    store[data.id].push(data);
    return store[data.id];
}

exports.find = (id) => {
    let result = [];
    if(store.hasOwnProperty(id)) {
        result = store[id];
    } 
    return result;
}

exports.getIds = () => {
    let ids = [];
    for ( let prop in store ) {
        ids.push(prop);
    }
    return ids;
}

exports.resetStore = () => {
    store = [];
}
