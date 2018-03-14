const driver = require('bigchaindb-driver');
const w = require('../thor/weather/weatherStation');
const d = require('../thor/weather/weatherData');

exports.BigchainDbConnection = class {
    constructor() {
        this.dataPersister = new driver.Ed25519Keypair();
        this.conn = new driver.Connection(
            'https://test.bigchaindb.com/api/v1/',
            { app_id: 'e425b5f8',
                app_key: '2e9821f00c4a814e1f9d63b1338753f9' });
        // Normally this code should be run on just one weather station, but for now and as an optimisation keep track of the weather stations we've created
        this.weatherStationMap = new Map();
    }

    async storeWeatherData(data) {
        try {
            let weatherStation = new w.WeatherStation(data.lat, data.long, data.owner);
            let weatherStationId;
            if (this.weatherStationMap.get(weatherStation)) {
                weatherStationId = this.weatherStationMap.get(weatherStation);
            } else {
                weatherStationId = await weatherStation.register();
                this.weatherStationMap.set(weatherStation, weatherStationId);
            }

            let weatherData = new d.WeatherData(data.temp, data.rain, data.humidity);
            /*const tx = driver.Transaction.makeCreateTransaction(
                weatherStation,
                weatherData,
                [ driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(this.dataPersister.publicKey))],
                this.dataPersister.publicKey
            );
            const txSigned = driver.Transaction.signTransaction(tx, this.dataPersister.privateKey);
            this.conn.postTransaction(txSigned);
            return this.conn.pollStatusAndFetchTransaction(txSigned.id)*/
        } catch(e) {
            throw e;
        }
    }

    async retrieveWeatherData(longitude, latitude) {
        return this.conn.searchAssets(longitude)
            .then((results) => {
                if (results.length > 0) {
                    return results[0]
                } else {
                    return results;
                }
            })
    }
};

