const apiKey = "9f319d7245061c9cf8e5c05569319364";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".feels-like").innerHTML = Math.round(data.main.feels_like) + " °c";
        document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
        document.querySelector(".visibility").innerHTML = data.visibility / 1000 + " Km"; // Convert meters to kilometers
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        } else if (data.weather[0].main == "Haze") {
            weatherIcon.src = "images/haze.png";
        }

        const lat = data.coord.lat;
        const lon = data.coord.lon;
        const uvApiUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
        const uvResponse = await fetch(uvApiUrl);
        const uvData = await uvResponse.json();

        document.querySelector(".uv").innerHTML = uvData.value;

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
