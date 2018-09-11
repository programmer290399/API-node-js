

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

var assert = require ('assert');
const Car = require('./carModel.js');

app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://Saahil290399:saahil143aasim@ds149682.mlab.com:49682/saahildb");


app.listen(3000, () => {

    console.log('App Successful listening on port 3000');
});



app.get('/cars', (req, res) => {
  Car.find({}, function (err,car) {
    assert.equal(err,null);
    res.json(car);
});
});

app.post('/cars', (req, res) => {
    Car.create({
        make: req.query.make,
        model: req.query.model,
        year: req.query.year
    }, (err, cars) => {
        if (err)
            console.log(handleError(err));
        Car.find((err, cars) => {
            if (err)
                console.log(handleError(err));
            res.json(cars);
        });
    });
});
app.put('/cars/:id', (req, res) => {
    Car.findById(req.params.id, (err, car) => {
        car.update(req.query, (err, cars) => {
            if (err)
                console.log(handleError(err));
            Car.find((err, cars) => {
                if (err)
                    console.log(handleError(err));
                res.json(cars);
            });
        });
    });
});
app.delete('/cars/:id', (req, res) => {
    Car.remove({
        _id: req.params.id
    }, (err, cars) => {
        if (err)
            console.log(handleError(err));
        Car.find((err, cars) => {
            if (err)
                console.log(handleError(err));
            res.json(cars);
        });
    });
});
