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
            let weatherStation = new w.WeatherStation();
            weatherStation.bigchainId = data.id;
            let weatherData = new d.WeatherData(data.temp, data.rain, data.humidity);
            await weatherStation.recordWeather(weatherData);
        } catch(e) {
            throw e;
        }
    }

    async retrieveWeatherData(longitude, latitude) {
        let weatherStation = new w.WeatherStation();
        weatherStation.bigchainId = longitude;
        return weatherStation.retrieveAllWeatherData();
        /*return this.conn.searchAssets(longitude)
            .then((results) => {
                if (results.length > 0) {
                    return results[0]
                } else {
                    return results;
                }
            })*/
    }
};

