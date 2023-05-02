async function fetchWeather() {
   try {
      // fetch json data
      const response = await fetch('https://api.weatherapi.com/v1/current.json?key=e4ce66e034244ced83270052231804&q=tokyo', { mode: 'cors' });
      const locationData = await response.json();
      console.log(locationData);
      console.log(locationData.location.name);
      // create object with json data
      const locationObject = {
         city: locationData.location.name,
         country: locationData.location.country,
         localTime: locationData.location.localtime,
         tempC: locationData.current.temp_c,
         tempF: locationData.current.temp_f,
         windKph: locationData.current.wind_kph,
         windMph: locationData.current.wind_mph,
         pressureMb: locationData.current.pressure_mb,
         pressureIn: locationData.current.pressure_in,
         humidity: locationData.current.humidity,
         cloud: locationData.current.cloud,
         feelsLikeC: locationData.current.feelslike_c,
         feelsLikeF: locationData.current.feelslike_f,
         visKm: locationData.current.vis_km,
         visMiles: locationData.current.vis_miles,
         uv: locationData.current.uv,
         text: locationData.current.condition.text,
         icon: locationData.current.condition.icon
      }
      console.log(locationObject);
      renderWeather(locationObject);
   } catch (error) {
      alert(error);
   }
}
fetchWeather();

function renderWeather(locationObject) {
   console.log(locationObject.city);
   const location = document.querySelector('.location');
   location.textContent = `${locationObject.city}, ${locationObject.country}`;
   // const time = document.querySelector('');
   // const temp = document.querySelector('');
   // const wind = document.querySelector('');
   // const pressure = document.querySelector('');
   // const humidity = document.querySelector('');
   // const cloud = document.querySelector('');
   // const feelsLike = document.querySelector('');
   // const visibility = document.querySelector('');
   // const uvIndex = document.querySelector('');
   // const weatherText = document.querySelector('');
   // const weatherIcon = document.querySelector('');
}