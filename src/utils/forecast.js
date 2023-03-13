const request = require('postman-request');


    const forecast = ( { lat, lon }, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=cf5655c384dea1036d774b4aa0c0ea77&query=' + lat + ',' + lon + '&units=m';

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service!');
        } else if (response.body.error) {
            callback('Please enter a valid location!');
        } else {
            const data = response.body.current;
            const weatherDesc = `The day seems ${data.weather_descriptions[0]}`;
            const actualTemp = `. It is currently ${data.temperature} degrees out.`;
            const apparentTemp = ` But it feels like ${data.feelslike} degrees out.`;
            callback(undefined, 
                weatherDesc +
                actualTemp +
                apparentTemp
            );
        }
    })
}

module.exports = forecast;