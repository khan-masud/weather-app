const apiKey = '18634547abfaa61f8d38b5eff6ae8a72';
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
       
    }
  }

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Fetch city name using OpenStreetMap Nominatim API
    const apiUrlForCity = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    fetch(apiUrlForCity)
      .then((response) => response.json())
      .then((data) => {
        const currentCity = data.address.city || data.address.town || data.address.village || "Unknown City";
        checkWeather(currentCity);
      });
  }

searchButton.addEventListener('click', ()=> {
    const cityName = searchBox.value;
    checkWeather(cityName);

})

async function checkWeather(cityName) {
    const response = await fetch(apiUrl + '&appid=' + apiKey + '&q=' + cityName + '&units=metric');
    const data = await response.json();

    console.log(apiUrl + '&appid=' + apiKey + '&q=' + cityName + '&units=metric');
    console.log(data);

    document.querySelector(".city").innerHTML = data.name + ', ' + data.sys.country || 'Invalid City';
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector(".feels").innerHTML = 'Feels Like ' + data.main.feels_like + '°C';
    document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
    document.querySelector(".wind").innerHTML = data.wind.speed + 'km/h';

    const weatherStatus = data.weather[0].main;

    if (weatherStatus == 'Clouds') {
        weatherIcon.src = "img/clouds.png";
    }
    else if (weatherStatus == 'Clear') {
        weatherIcon.src = "img/clear.png";
    }
    else if (weatherStatus == 'Haze' || weatherStatus == 'Drizzle') {
        weatherIcon.src = "img/drizzle.png";
    }
    else if (weatherStatus == 'Mist') {
        weatherIcon.src = "img/mist.png";
    }
    else if (weatherStatus == 'Rain') {
        weatherIcon.src = "img/rain.png";
    }
    else if (weatherStatus == 'Snow') {
        weatherIcon.src = "img/Snow.png";
    }

    document.querySelector(".weather-text").innerHTML = weatherStatus;
};


getLocation();