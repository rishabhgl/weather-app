const request = require('postman-request');


const geoCode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoicmlzaGFiaGdsIiwiYSI6ImNsZXA3MzJ6MzAxYzgzeHFnemJ0emQ4dHkifQ.i4gT4gaTI1O_t9bMQS44hw`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geolocation service!');
        } else if (response.body.features.length === 0) {
            callback('Please enter a valid location!');
        } else {
            const geoData = response.body.features[0];
            const lat = geoData.center[1];
            const lon = geoData.center[0];
            callback(undefined, {
                name: geoData.place_name,
                lat,
                lon
            });
        }
    })
}

module.exports = geoCode;