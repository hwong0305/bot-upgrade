const fetch = require('node-fetch'); // Am using node-fetch since the native node.js global is still experimental

const fetchWeather = async location => {
  const response = await fetch(
    `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${process.env.TOMORROW_API_KEY}`,
    {
      headers: {
        accept: 'application/json',
      },
    }
  );

  return response.json();
};

module.exports.fetchWeather = fetchWeather;
