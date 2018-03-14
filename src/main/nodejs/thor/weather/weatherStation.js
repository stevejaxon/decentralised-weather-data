const DID = require('./DID').DID;
const BigchainDB = require('bigchaindb-driver');
const bip39 = require('bip39');

exports.WeatherStation = class extends DID {
    constructor(lat, long, owner) {
        // Every weather station should have its own private key; for now we create it on the fly
        let keypair = new BigchainDB.Ed25519Keypair(bip39.mnemonicToSeed('seedPhrase').slice(0,32));
        super(keypair);
        this.latitude = lat;
        this.longitude = long;
        this.owner = owner;
        this.bigchainId = 0;
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
            console.log(asset);
            this.bigchainId = asset.id;
            console.log(this.bigchainId);
        });
    }
};