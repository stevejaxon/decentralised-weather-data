const express = require('express');
const app = express();
const blockchain = require('./src/main/nodejs/blockchain/bigchainDb');
const bigchainDB = new blockchain.BigchainDbConnection();

// respond with "hello world" when a GET request is made to the homepage
app.get('/weather/lon/:lon/lat/:lat', function (req, res) {
    let params = req.params;
    return bigchainDB.retrieveWeatherData(params.lon, params.lat)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({ error: err });
        })
});

app.listen(3000);