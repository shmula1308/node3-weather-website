const request = require("request");

//By setting json option to true we don't need to parse a json response
//We will only access body property, which is now converted to a javascript object

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b92a96590dac3d6898f066655a6fb041&query=${latitude},${longitude}`;
  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to server!", undefined);
      } else if (body.error) {
        callback("Unable to find location!", undefined);
      } else {
        const { temperature, feelslike, weather_descriptions } = body.current;
        callback(
          undefined,
          `${weather_descriptions[0]} It is currently ${temperature} degrees out. It feels like ${feelslike}`
        );
      }
    }
  );
};

module.exports = forecast;
