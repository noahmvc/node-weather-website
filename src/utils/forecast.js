const request = require("request");

//////
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b39399b1ff5520d834c25a64742dee51&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(
        "Unable to connect to the weather service! Check your connection",
        undefined
      );
    } else if (body.error) {
      callback("Unable to find the location specified!", undefined);
    } else {
      callback(
        undefined,
        `It's currently ${body.current.temperature} degrees and ${body.current.weather_descriptions[0]} outside, but it feels like it's ${body.current.feelslike} degrees outside`
      );
    }
  });
};

module.exports = forecast;
