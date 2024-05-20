// WEATHER APP

const weatherform = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apikey = "62df38246f91e134c224c0c52381c47d";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;
    if (city) {
        try {
            const weatherdata = await getWeatherData(city);
            displayweatherInfo(weatherdata);
        }
        catch (error) {
            console.log(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error("Could not fetch weather Data");
    }

    return await response.json();

}

function displayweatherInfo(data) {
    // console.log(data);
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

    cityDisplay.textContent = city;
    // cityDisplay.classList.add("citydisplay");

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;

    humidityDisplay.textContent = `Humidity:${humidity}%`;

    descDisplay.textContent = description;

    weatheremoji.textContent = getWeatherEmoji(id);

    weatheremoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatheremoji);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId == 800):
            return "🌥️";
        case (weatherId >= 801 && weatherId < 810):
            return "☀️";
        default:
            return "?";


    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}