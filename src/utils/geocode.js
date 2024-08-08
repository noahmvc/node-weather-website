const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    address
  )}&access_token=pk.eyJ1Ijoibm9haHN0YWN5IiwiYSI6ImNsemlkcWZsdjBmbDgycXE4cmltaGpocnUifQ.pbPMAff-tG1_ji21wd0S9g&limit=1`; //encodeURIComponent(address) --> Will notice when contains special characters ? --> %3F

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        location: body.features[0].properties.full_address,
      });
    }
  });
};

module.exports = geocode;
