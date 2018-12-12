const MongoClient = require('mongodb').MongoClient;

const state = {
    db: null
};

exports.connect = (done) => {
    if (state.db) {
        return done();
    }
    const client = new MongoClient('mongodb://localhost:27017/myapi');
    client.connect( (err, db) => {
        if (err) {
            return done(err);
        }
        state.db = client.db('artists');
        done();
    })
}

exports.get = () => {
    return state.db;
}