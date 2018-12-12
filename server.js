const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID; 

const db = require('./db')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


let artists = [
    {
        id:1,
        name:'Metallica'
    },
    {
        id:2,
        name:'Iron Maiden'
    },
    {
        id:3,
        name:'Deep Purple'
    }
];


app.get('/', (req, res) => res.send('Hello API'));

app.get('/artists', (req, res) => {    
    db.get().collection('artists').find().toArray( (err, docs) => {
    if (err) {
        console.log(err);
        return res.sendStatus(500);
    }
    res.send(docs);
    })
})

app.get('/artists/:id', (req, res) => {
    db.get().collection('artists').findOne({ _id: ObjectID(req.params.id)}, (err, doc) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
        })
        
    })

app.post('/artists', (req, res) => {
    let artist = {
        name: req.body.name
    };
    db.get().collection('artists').insertOne(artist, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }   
        res.send(artist);
    });
    //res.send(artist);
})

app.put('/artists/:id', (req, res) => {
    db.get().collection('artists').updateOne(
        { _id: ObjectID(req.params.id) },
        { $set: { name: req.body.name } },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
})

app.delete('/artists/:id', (req, res) => {
    db.get().collection('artists').deleteOne(
        { _id: ObjectID(req.params.id) },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
    // artists = artists.filter((artist) => artist.id !== Number(req.params.id));
    // res.sendStatus(200);
})

db.connect( (err) => {
    if (err) {
        return console.log(err);
    }
    app.listen(3012, function () {
    console.log('API app started');
    })
})


