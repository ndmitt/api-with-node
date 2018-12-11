const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID; 

const app = express();
let db;

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
    db.collection('artists').find().toArray( (err, docs) => {
    if (err) {
        console.log(err);
        return res.sendStatus(500);
    }
    res.send(docs);
    })
})

app.get('/artists/:id', (req, res) => {
    db.collection('artists').findOne({ _id: ObjectID(req.params.id)}, (err, doc) => {
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
    db.collection('artists').insert(artist, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }   
        res.send(artist);
    });
    //res.send(artist);
})

app.put('/artists/:id', (req, res) => {
    let artist = artists.find((artist) => artist.id === Number(req.params.id));
    artist.name = req.body.name;
    res.sendStatus(200);
})

app.delete('/artists/:id', (req, res) => {
    artists = artists.filter((artist) => artist.id !== Number(req.params.id));
    res.sendStatus(200);
})

const client = new MongoClient('mongodb://localhost:27017/myapi');

client.connect( (err) => {
    if (err) {
        return console.log(err);
    }
    db = client.db('artists');
    app.listen(3012, function () {
    console.log('API app started');
    })
})


