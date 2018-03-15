const DID = require('./DID').DID;
const BigchainDB = require('bigchaindb-driver');
const bip39 = require('bip39');
const w = require('../thor/weather/weatherStation');
const d = require('../thor/weather/weatherData');

exports.BigchainDbConnection = class extends DID  {
    constructor() {
        // Every weather station should have its own private key; for now we create it on the fly
        let keypair = new BigchainDB.Ed25519Keypair(bip39.mnemonicToSeed('seedPhrase').slice(0,32));
        super(keypair);
        // Normally this code should be run on just one weather station, but for now and as an optimisation keep track of the weather stations we've created
        this.weatherStationMap = new Map();
    }

    async storeWeatherData(data) {
        try {
            let weatherStation = new w.WeatherStation();
            weatherStation.bigchainId = data.id;
            let weatherData = new d.WeatherData(data.temp, data.rain, data.humidity);
            await this.recordWeather(weatherData);
        } catch(e) {
            throw e;
        }
    }

    async retrieveWeatherData(longitude, latitude) {
        let weatherStation = new w.WeatherStation();
        weatherStation.bigchainId = longitude;
        return this.retrieveAllWeatherData();
        /*return this.conn.searchAssets(longitude)
            .then((results) => {
                if (results.length > 0) {
                    return results[0]
                } else {
                    return results;
                }
            })*/
    }

    async register() {
        console.log('registering a new weather station in BigChain DB');
        return this.myModel.create({
            keypair: this.entity,
            data: {
                latitude: this.latitude,
                longitude: this.longitude,
                owner: this.owner
            }
        })
            .then(asset => {
                this.bigchainId = asset.id;
                console.log(this.bigchainId);
            });
    }

    async recordWeather(weatherData) {
        return this.myModel.retrieve(this.bigchainId)
            .then(assets => {
                console.log(assets);
                return assets[0].append({
                    toPublicKey: this.entity.publicKey,
                    keypair: this.entity,
                    data: { weatherData }
                })
            })
            .then(updatedAsset => {
                console.log(updatedAsset);
            });
    }

    async retrieveAllWeatherData() {
        return this.myModel.retrieve(this.bigchainId)
            .then(assets => {
                return assets;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
};

