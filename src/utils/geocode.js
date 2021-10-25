const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2htdWxhIiwiYSI6ImNrdDkwYmtwYjAzc3kydm13Y2NuM20ydHkifQ.nr0fiCQr4Rt1rgckdB5_EQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to service", undefined);
    } else if (!body.features.length) {
      callback("Location not found", undefined);
    } else {
      const [lon, lat] = body.features[0].center;

      callback(undefined, {
        latitude: lat,
        longitude: lon,
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
