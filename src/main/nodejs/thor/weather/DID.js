// Class based on the DID class from the https://www.bigchaindb.com/guides/tutorial-car-telemetry-app/ tutorial.
const Orm = require('bigchaindb-orm');
const API_PATH = 'https://test.bigchaindb.com/api/v1/';

exports.DID = class extends Orm {
    constructor(entity) {
        super(
            // Note these details such be unique for each weather station and private
            API_PATH,
            {
                app_id: 'e425b5f8',
                app_key: '2e9821f00c4a814e1f9d63b1338753f9'
            }
        );
        this.entity = entity;
        this.define("myModel", "https://schema.org/v1/myModel");
    }
};