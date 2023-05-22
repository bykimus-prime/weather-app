const form = document.querySelector('form');
const submitBtn = document.querySelector('#searchSubmit');

form.addEventListener('submit', handleSubmit)
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
   e.preventDefault();
   getLocation();
}

async function fetchWeather(location) {
   console.log(location)
   try {
      // fetch json data
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e4ce66e034244ced83270052231804&q=${location}&days=3`, { mode: 'cors' });
      const locationData = await response.json();
      // create object with json data
      const locationObject = {
         city: locationData.location.name,
         country: locationData.location.country,
         localTime: locationData.location.localtime,
         tempC: locationData.current.temp_c,
         tempF: locationData.current.temp_f,
         isDay: locationData.current.is_day,
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
         iconCode: locationData.current.condition.code,
         // forecast data, hour. api free tier only gives 3 hours apparently
         hour1: locationData.forecast.forecastday[0].hour[0].time.substr(11, 15), // returns only part of a string
         hour1TempC: locationData.forecast.forecastday[0].hour[0].temp_c,
         hour1TempF: locationData.forecast.forecastday[0].hour[0].temp_f,
         hour1Rain: locationData.forecast.forecastday[0].hour[0].chance_of_rain,
         hour1PrecipMm: locationData.forecast.forecastday[0].hour[0].precip_mm,
         hour1PrecipIn: locationData.forecast.forecastday[0].hour[0].precip_in,
         // next hour + 1
         hour2: locationData.forecast.forecastday[1].hour[1].time.substr(11, 15),
         hour2TempC: locationData.forecast.forecastday[1].hour[1].temp_c,
         hour2TempF: locationData.forecast.forecastday[1].hour[1].temp_f,
         hour2Rain: locationData.forecast.forecastday[1].hour[1].chance_of_rain,
         hour2PrecipMm: locationData.forecast.forecastday[1].hour[1].precip_mm,
         hour2PrecipIn: locationData.forecast.forecastday[1].hour[1].precip_in,
         // next hour + 2
         hour3: locationData.forecast.forecastday[2].hour[2].time.substr(11, 15),
         hour3TempC: locationData.forecast.forecastday[2].hour[2].temp_c,
         hour3TempF: locationData.forecast.forecastday[2].hour[2].temp_f,
         hour3Rain: locationData.forecast.forecastday[2].hour[2].chance_of_rain,
         hour3PrecipMm: locationData.forecast.forecastday[2].hour[2].precip_mm,
         hour3PrecipIn: locationData.forecast.forecastday[2].hour[2].precip_in,
         // forecast data, day. api free tier only gives 3 days
         dayDate1: locationData.forecast.forecastday[0].date,
         dayDate1TempC: locationData.forecast.forecastday[0].day.avgtemp_c,
         dayDate1TempF: locationData.forecast.forecastday[0].day.avgtemp_f,
         dayDate1Rain: locationData.forecast.forecastday[0].day.daily_chance_of_rain,
         dayDate1PrecipMm: locationData.forecast.forecastday[0].day.totalprecip_mm,
         dayDate1PrecipIn: locationData.forecast.forecastday[0].day.totalprecip_in,
         // next day
         dayDate2: locationData.forecast.forecastday[1].date,
         dayDate2TempC: locationData.forecast.forecastday[1].day.avgtemp_c,
         dayDate2TempF: locationData.forecast.forecastday[1].day.avgtemp_f,
         dayDate2Rain: locationData.forecast.forecastday[1].day.daily_chance_of_rain,
         dayDate2PrecipMm: locationData.forecast.forecastday[1].day.totalprecip_mm,
         dayDate2PrecipIn: locationData.forecast.forecastday[1].day.totalprecip_in,
         // third day
         dayDate3: locationData.forecast.forecastday[2].date,
         dayDate3TempC: locationData.forecast.forecastday[2].day.avgtemp_c,
         dayDate3TempF: locationData.forecast.forecastday[2].day.avgtemp_f,
         dayDate3Rain: locationData.forecast.forecastday[2].day.daily_chance_of_rain,
         dayDate3PrecipMm: locationData.forecast.forecastday[2].day.totalprecip_mm,
         dayDate3PrecipIn: locationData.forecast.forecastday[2].day.totalprecip_in
      }
      renderWeather(locationObject);
      form.reset(); // resets form input after fetching weather from location
   } catch (error) {
      alert(error);
   }
}
fetchWeather('seattle');

function renderWeather(locationObject) {
   if (locationObject.isDay === 1) {
      dayOrNight = 'day';
   } else {
      dayOrNight = 'night';
   }
   // query selectors
   const location = document.querySelector('.location');
   const time = document.querySelector('.date');
   const temp = document.querySelector('.temperature');
   const wind = document.querySelector('.wind');
   const pressure = document.querySelector('.pressure');
   const humidity = document.querySelector('.humidity');
   const feelsLike = document.querySelector('.feels-like');
   const visibility = document.querySelector('.visibility');
   const uvIndex = document.querySelector('.uv-index');
   const weatherText = document.querySelector('.current-weather');
   const weatherIconDisplay = document.querySelector('.weather-icon-display');
   // forecast hour selectors
   const hour1 = document.querySelector('.hour1');
   const hour1Temp = document.querySelector('.hourly-temp1');
   const hour1Rain = document.querySelector('.hourly-rain-chance1');
   const hour1Precip = document.querySelector('.hourly-precipitation1');
   const hour2 = document.querySelector('.hour2');
   const hour2Temp = document.querySelector('.hourly-temp2');
   const hour2Rain = document.querySelector('.hourly-rain-chance2');
   const hour2Precip = document.querySelector('.hourly-precipitation2');
   const hour3 = document.querySelector('.hour3');
   const hour3Temp = document.querySelector('.hourly-temp3');
   const hour3Rain = document.querySelector('.hourly-rain-chance3');
   const hour3Precip = document.querySelector('.hourly-precipitation3');
   // forecast day selectors
   const day1 = document.querySelector('.day1');
   const day1Temp = document.querySelector('.daily-temp1');
   const day1Rain = document.querySelector('.daily-rain-chance1');
   const day1Precip = document.querySelector('.daily-precipitation1');
   const day2 = document.querySelector('.day2');
   const day2Temp = document.querySelector('.daily-temp2');
   const day2Rain = document.querySelector('.daily-rain-chance2');
   const day2Precip = document.querySelector('.daily-precipitation2');
   const day3 = document.querySelector('.day3');
   const day3Temp = document.querySelector('.daily-temp3');
   const day3Rain = document.querySelector('.daily-rain-chance3');
   const day3Precip = document.querySelector('.daily-precipitation3');

   // fill in selected queries with info from the weather object
   location.textContent = `${locationObject.city}, ${locationObject.country}`;
   time.textContent = locationObject.localTime;
   temp.textContent = `${locationObject.tempC}\u00B0C`; // javascript way to write degree symbol
   wind.textContent = `${locationObject.windKph} kph`;
   pressure.textContent = `${locationObject.pressureMb} mb`;
   humidity.textContent = `${locationObject.humidity}%`;
   feelsLike.textContent = `${locationObject.feelsLikeC}\u00B0C`;
   visibility.textContent = `${locationObject.visKm} km`;
   uvIndex.textContent = locationObject.uv;
   weatherText.textContent = locationObject.text;
   // get image from folder based on code from api
   if (locationObject.iconCode == 1000) {
      weatherIcon = `./images/${dayOrNight}/113.png`;
   } else if (locationObject.iconCode == 1003) {
      weatherIcon = `./images/${dayOrNight}/116.png`;
   } else if (locationObject.iconCode == 1006) {
      weatherIcon = `./images/${dayOrNight}/119.png`;
   } else if (locationObject.iconCode == 1009) {
      weatherIcon = `./images/${dayOrNight}/122.png`;
   } else if (locationObject.iconCode == 1030) {
      weatherIcon = `./images/${dayOrNight}/143.png`;
   } else if (locationObject.iconCode == 1063) {
      weatherIcon = `./images/${dayOrNight}/176.png`;
   } else if (locationObject.iconCode == 1066) {
      weatherIcon = `./images/${dayOrNight}/179.png`;
   } else if (locationObject.iconCode == 1069) {
      weatherIcon = `./images/${dayOrNight}/182.png`;
   } else if (locationObject.iconCode == 1072) {
      weatherIcon = `./images/${dayOrNight}/185.png`;
   } else if (locationObject.iconCode == 1087) {
      weatherIcon = `./images/${dayOrNight}/200.png`;
   } else if (locationObject.iconCode == 1114) {
      weatherIcon = `./images/${dayOrNight}/227.png`;
   } else if (locationObject.iconCode == 1117) {
      weatherIcon = `./images/${dayOrNight}/230.png`;
   } else if (locationObject.iconCode == 1135) {
      weatherIcon = `./images/${dayOrNight}/248.png`;
   } else if (locationObject.iconCode == 1147) {
      weatherIcon = `./images/${dayOrNight}/260.png`;
   } else if (locationObject.iconCode == 1150) {
      weatherIcon = `./images/${dayOrNight}/263.png`;
   } else if (locationObject.iconCode == 1153) {
      weatherIcon = `./images/${dayOrNight}/266.png`;
   } else if (locationObject.iconCode == 1168) {
      weatherIcon = `./images/${dayOrNight}/281.png`;
   } else if (locationObject.iconCode == 1171) {
      weatherIcon = `./images/${dayOrNight}/284.png`;
   } else if (locationObject.iconCode == 1180) {
      weatherIcon = `./images/${dayOrNight}/293.png`;
   } else if (locationObject.iconCode == 1183) {
      weatherIcon = `./images/${dayOrNight}/296.png`;
   } else if (locationObject.iconCode == 1186) {
      weatherIcon = `./images/${dayOrNight}/299.png`;
   } else if (locationObject.iconCode == 1189) {
      weatherIcon = `./images/${dayOrNight}/302.png`;
   } else if (locationObject.iconCode == 1192) {
      weatherIcon = `./images/${dayOrNight}/305.png`;
   } else if (locationObject.iconCode == 1195) {
      weatherIcon = `./images/${dayOrNight}/308.png`;
   } else if (locationObject.iconCode == 1198) {
      weatherIcon = `./images/${dayOrNight}/311.png`;
   } else if (locationObject.iconCode == 1201) {
      weatherIcon = `./images/${dayOrNight}/314.png`;
   } else if (locationObject.iconCode == 1204) {
      weatherIcon = `./images/${dayOrNight}/317.png`;
   } else if (locationObject.iconCode == 1207) {
      weatherIcon = `./images/${dayOrNight}/320.png`;
   } else if (locationObject.iconCode == 1210) {
      weatherIcon = `./images/${dayOrNight}/323.png`;
   } else if (locationObject.iconCode == 1213) {
      weatherIcon = `./images/${dayOrNight}/326.png`;
   } else if (locationObject.iconCode == 1216) {
      weatherIcon = `./images/${dayOrNight}/329.png`;
   } else if (locationObject.iconCode == 1219) {
      weatherIcon = `./images/${dayOrNight}/332.png`;
   } else if (locationObject.iconCode == 1222) {
      weatherIcon = `./images/${dayOrNight}/335.png`;
   } else if (locationObject.iconCode == 1225) {
      weatherIcon = `./images/${dayOrNight}/338.png`;
   } else if (locationObject.iconCode == 1237) {
      weatherIcon = `./images/${dayOrNight}/350.png`;
   } else if (locationObject.iconCode == 1240) {
      weatherIcon = `./images/${dayOrNight}/353.png`;
   } else if (locationObject.iconCode == 1243) {
      weatherIcon = `./images/${dayOrNight}/356.png`;
   } else if (locationObject.iconCode == 1246) {
      weatherIcon = `./images/${dayOrNight}/359.png`;
   } else if (locationObject.iconCode == 1249) {
      weatherIcon = `./images/${dayOrNight}/362.png`;
   } else if (locationObject.iconCode == 1252) {
      weatherIcon = `./images/${dayOrNight}/365.png`;
   } else if (locationObject.iconCode == 1255) {
      weatherIcon = `./images/${dayOrNight}/368.png`;
   } else if (locationObject.iconCode == 1258) {
      weatherIcon = `./images/${dayOrNight}/371.png`;
   } else if (locationObject.iconCode == 1261) {
      weatherIcon = `./images/${dayOrNight}/374.png`;
   } else if (locationObject.iconCode == 1264) {
      weatherIcon = `./images/${dayOrNight}/377.png`;
   } else if (locationObject.iconCode == 1273) {
      weatherIcon = `./images/${dayOrNight}/386.png`;
   } else if (locationObject.iconCode == 1276) {
      weatherIcon = `./images/${dayOrNight}/389.png`;
   } else if (locationObject.iconCode == 1279) {
      weatherIcon = `./images/${dayOrNight}/392.png`;
   } else if (locationObject.iconCode == 1282) {
      weatherIcon = `./images/${dayOrNight}/395.png`;
   }
   weatherIconDisplay.src = weatherIcon;
   // filling out weather forecast hourly dom info
   hour1.textContent = `${locationObject.hour1}`;
   hour1Temp.textContent = `${locationObject.hour1TempC}\u00B0C`;
   hour1Rain.textContent = `${locationObject.hour1Rain}%`;
   hour1Precip.textContent = `${locationObject.hour1PrecipMm}mm`;
   hour2.textContent = `${locationObject.hour2}`
   hour2Temp.textContent = `${locationObject.hour2TempC}\u00B0C`;
   hour2Rain.textContent = `${locationObject.hour2Rain}%`;
   hour2Precip.textContent = `${locationObject.hour2PrecipMm}mm`;
   hour3.textContent = `${locationObject.hour3}`;
   hour3Temp.textContent = `${locationObject.hour3TempC}\u00B0C`;
   hour3Rain.textContent = `${locationObject.hour3Rain}%`;
   hour3Precip.textContent = `${locationObject.hour3PrecipMm}mm`;
   // filling out weather forecast daily dom info
   day1.textContent = `${locationObject.dayDate1}`;
   day1Temp.textContent = `${locationObject.dayDate1TempC}\u00B0C`;
   day1Rain.textContent = `${locationObject.dayDate1Rain}%`;
   day1Precip.textContent = `${locationObject.dayDate1PrecipMm}mm`;
   day2.textContent = `${locationObject.dayDate2}`;
   day2Temp.textContent = `${locationObject.dayDate2TempC}\u00B0C`;
   day2Rain.textContent = `${locationObject.dayDate2Rain}%`;
   day2Precip.textContent = `${locationObject.dayDate2PrecipMm}mm`;
   day3.textContent = `${locationObject.dayDate3}`;
   day3Temp.textContent = `${locationObject.dayDate3TempC}\u00B0C`;
   day3Rain.textContent = `${locationObject.dayDate3Rain}%`;
   day3Precip.textContent = `${locationObject.dayDate3PrecipMm}mm`;
}

function getLocation() {
   const input = document.querySelector('#searchInput');
   fetchWeather(input.value);
}