const container = document.getElementById('city');
const forecast = document.getElementById('forecast-container');

// Get the user's current location
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;

  // Fetch the current weather data for the user's location
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=ddf98774bfc0041a16a7d95948e68934`)
    .then((response) => response.json())
    .then((json) => {
      // Convert Unix timestamps to date objects
      const sunrise = new Date(json.sys.sunrise * 1000);
      const sunset = new Date(json.sys.sunset * 1000);

      // Update the HTML content with the current weather data for the user's location
      container.innerHTML = `
        <h1> ${json.name} </h1>
        <h2> ${(Math.round(json.main.temp))}°C</h2>
        <h3> ${json.weather[0].description}</h3>
        <h4> 🌅 sunrise ${sunrise.toLocaleTimeString()}</h4>
        <h4> 🌇 sunset ${sunset.toLocaleTimeString()}</h4>
      `;
    });

  // Fetch the weather forecast data for the user's location
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=ddf98774bfc0041a16a7d95948e68934`)
    .then((response) => response.json())
    .then((json) => {
      // Filter the forecast data to only show the information for 12:00 PM each day
      const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'));

      // Update the HTML content with the forecast data for the user's location
      filteredForecast.forEach((weeklyForecast) => {
        forecast.innerHTML += `<h3>${weeklyForecast.dt_txt} |---| ${weeklyForecast.main.temp.toFixed(1)}\u00B0C <h3>
                                        <p>Feels like ${weeklyForecast.main.feels_like}\u00B0C<p>
                                        <p>High: ${weeklyForecast.main.temp_max}\u00B0C Low:${weeklyForecast.main.temp_min}\u00B0C<p>`;
      });
    });
});
