const Artists = require('../models/artists');

exports.all = (req, res) => {
    Artists.all( (err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}