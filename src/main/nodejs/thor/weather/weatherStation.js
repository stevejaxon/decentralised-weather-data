exports.WeatherStation = class {
    constructor(lat, long, owner) {
        this.latitude = lat;
        this.longitude = long;
        this.owner = owner;
        this.bigchainId = 0;
    }
};