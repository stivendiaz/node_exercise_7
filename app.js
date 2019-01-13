const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.get('/', function (req, res) {
    conection();
    if (req.query.name) {
        insert(formatObject(req.query.name));
    } else {
        insert(formatObject("Anónimo"));
    }
    res.send('<h1>El visitante fue almacenado con éxito</h1>');
});

function formatObject(name) {
    var datetime = new Date();
    return {
        name: name,
        date: datetime
    }
}

function insert(myobj) {
    var db = mongoose.connection;
    db.collection("visitantes").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
}



function conection() {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true
    });
}

app.listen(3000, () => console.log('Listening on port 3000!'));