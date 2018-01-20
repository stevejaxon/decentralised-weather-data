const driver = require('bigchaindb-driver');

exports.BigchainDbConnection = class {
    constructor() {
        this.dataPersister = new driver.Ed25519Keypair();
        this.conn = new driver.Connection(
            'https://test.bigchaindb.com/api/v1/',
            { app_id: 'e425b5f8',
                app_key: '2e9821f00c4a814e1f9d63b1338753f9' });
    }

    async storeWeatherData(data) {
        const tx = driver.Transaction.makeCreateTransaction(
            data,
            null,
            [ driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(this.dataPersister.publicKey))],
            this.dataPersister.publicKey
        );
        const txSigned = driver.Transaction.signTransaction(tx, this.dataPersister.privateKey);
        this.conn.postTransaction(txSigned);
        return this.conn.pollStatusAndFetchTransaction(txSigned.id)
    }

    async retrieveWeatherData(longitude, latitude) {
        return this.conn.searchAssets(longitude);
    }
};

