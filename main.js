const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const blockchain = require('./src/main/nodejs/blockchain/bigchainDb');
const bigchainDB = new blockchain.BigchainDbConnection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/weather/lon/:lon/lat/:lat', function (req, res) {
    let params = req.params;
    return bigchainDB.retrieveWeatherData(params.lon, params.lat)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({ error: err });
        })
});

app.post('/weather', function (req, res) {
    return bigchainDB.storeWeatherData(req.body)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.status(500).send({ error: err });
        })
});

app.listen(3000);