async function fetchWeather() {
   try {
      // fetch json data
      const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=e4ce66e034244ced83270052231804&q=seattle&days=6', { mode: 'cors' });
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
         // forecast data, hour
         // dayHour: locationData.forecast.forecastday[0].hour[0].time,
         // forecast data, day
         dayDate1: locationData.forecast.forecastday[0].date, // api free tier only gives 3 days
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
      // console.log(locationObject.dayHour);
      renderWeather(locationObject);
   } catch (error) {
      alert(error);
   }
}
fetchWeather();

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
   // filling out weather forecast dom info
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