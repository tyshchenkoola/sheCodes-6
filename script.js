let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

function roundToNearestWhole(num) {
  return Math.round(num);
}

const searchButton = document.querySelector(".search-button");
const cityInput = document.querySelector(".enter-city-input");
const cityNameDisplay = document.querySelector(".city-info");

searchButton.addEventListener("click", function () {
  const city = cityInput.value;
  if (city.trim() !== "") {
    cityNameDisplay.textContent = city;
    cityInput.value = "";
  }
});

const dateInfo = document.querySelector(".date-info");

function getCurrentDateAndTime() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[now.getDay()];
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day} ${time}`;
}

dateInfo.textContent = getCurrentDateAndTime();

let fakeTemperatureCelsius = 17;
let isTemperatureInCelsius = true;
const temperatureInfo = document.querySelector(".weather-info");

temperatureInfo.addEventListener("click", function () {
  if (isTemperatureInCelsius) {
    const tempFahrenheit = roundToNearestWhole(
      (fakeTemperatureCelsius * 9) / 5 + 32
    );
    temperatureInfo.textContent = `${tempFahrenheit}°F`;
  } else {
    temperatureInfo.textContent = `${fakeTemperatureCelsius}°C`;
  }
  isTemperatureInCelsius = !isTemperatureInCelsius;
});

const temperatureDisplay = document.querySelector(
  ".current-temperature .weather-info"
);

searchButton.addEventListener("click", function () {
  const city = cityInput.value.toLowerCase();
  if (city.trim() !== "") {
    cityNameDisplay.textContent = city;
    const cityData = weather[city];
    if (cityData) {
      const tempCelsius = roundToNearestWhole(cityData.temp);
      temperatureDisplay.textContent = `${tempCelsius}°C`;
    } else {
      temperatureDisplay.textContent = "N/A";
    }
    cityInput.value = "";
  }
});

const currentLocationButton = document.querySelector("#currentLocationButton");

currentLocationButton.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiKey = "0962f07748f5f51f4ea539a0260ddd9f";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const cityName = data.name;
            const temperature = data.main.temp;

            const cityDisplay = document.querySelector(".city-info");
            const temperatureDisplay = document.querySelector(".weather-info");
            cityDisplay.textContent = cityName;
            temperatureDisplay.textContent = `${temperature}°C`;
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      },
      function (error) {
        console.error("Geolocation error:", error);
      }
    );
  } else {
    console.error("Geolocation is not available");
  }
});
