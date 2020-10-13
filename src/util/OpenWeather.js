// OpenWeather Info
const openWeatherKey = '';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

const OpenWeather = {
  async getForecast(location) {
    const urlToFetch = `${weatherUrl}?q=${location}&APPID=${openWeatherKey}`;
    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return {
          temp: jsonResponse.main.temp,
          condition: jsonResponse.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${jsonResponse.weather[0].icon}@2x.png`,
          name: jsonResponse.name
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default OpenWeather;
