const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const assert = chai.assert;
const fs = require('fs');
const path = require('path');
const blockchain = require('../../../main/nodejs/blockchain/bigchainDb');

const shuzenjiLongitude = "138.9304";
const shuzenjiLatitude = "34.9719";

describe('BigchainDB Tests', function() {
    let blockchainConnectionInstance;

    before('Create a BigchainDB connection', function () {
        blockchainConnectionInstance = new blockchain.BigchainDbConnection();
    });

    it('It should be possible to store and retrieve data in BigchainDB', function () {
        // First retrieve the test data to store
        testData = readObjectFromFile("shuzenji_current_data");

        // Store the data
        assert.isFulfilled(blockchainConnectionInstance.storeWeatherData(testData)
            .then((result) => {
                assert.isNotNull(result);
                assert.isNotNull(result.id);
                console.log(result);
                return blockchainConnectionInstance.retrieveWeatherData(shuzenjiLongitude, shuzenjiLatitude)
            })
            .then((retrievedData) => {
                assert.isNotNull(retrievedData);
                assert.isTrue(retrievedData.length > 0);
                coord = retrievedData[0].data.coord;
                assert.equal(coord.lon, shuzenjiLongitude);
                assert.equal(coord.lat, shuzenjiLatitude);
            }))
    })
});

// Helper utilities
function readObjectFromFile(fileName) {
    let filePath =  path.resolve(__dirname, 'data', fileName);
    let contents = fs.readFileSync(filePath);
    return JSON.parse(contents);
}