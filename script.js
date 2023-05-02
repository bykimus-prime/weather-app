async function fetchWeather() {
   try {
      // fetch json data
      const response = await fetch('https://api.weatherapi.com/v1/current.json?key=e4ce66e034244ced83270052231804&q=seattle', { mode: 'cors' });
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
         feelsLikeC: locationData.current.feelslike_c,
         feelsLikeF: locationData.current.feelslike_f,
         visKm: locationData.current.vis_km,
         visMiles: locationData.current.vis_miles,
         uv: locationData.current.uv,
         text: locationData.current.condition.text,
         icon: locationData.current.condition.icon
      }
      console.log(locationObject.icon);
      renderWeather(locationObject);
   } catch (error) {
      alert(error);
   }
}
fetchWeather();

function renderWeather(locationObject) {
   console.log(locationObject.icon);
   // query selectors
   const location = document.querySelector('.location');
   const time = document.querySelector('.date');
   const temp = document.querySelector('.temperature');
   const wind = document.querySelector('.wind');
   const pressure = document.querySelector('.pressure');
   const humidity = document.querySelector('.humidity');
   // const cloud = document.querySelector('');
   const feelsLike = document.querySelector('.feels-like');
   const visibility = document.querySelector('.visibility');
   const uvIndex = document.querySelector('.uv-index');
   const weatherText = document.querySelector('.current-weather');
   // const weatherIcon = document.querySelector('.weather-icon');

   // fill in selected queries with info from the weather object
   location.textContent = `${locationObject.city}, ${locationObject.country}`;
   time.textContent = locationObject.localTime;
   temp.textContent = `${locationObject.tempC}\u00B0C`;
   wind.textContent = `${locationObject.windKph} kph`;
   pressure.textContent = `${locationObject.pressureMb} mb`;
   humidity.textContent = `${locationObject.humidity}%`;
   feelsLike.textContent = `${locationObject.feelsLikeC}\u00B0C`;
   visibility.textContent = `${locationObject.visKm} km`;
   uvIndex.textContent = locationObject.uv;
   weatherText.textContent = locationObject.text;
   // weatherIcon.src = locationObject.icon;
}