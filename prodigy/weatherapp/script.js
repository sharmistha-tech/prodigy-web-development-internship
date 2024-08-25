const apiKey = '886508ce474ff0337fc5f09277229827'; // Replace with your OpenWeatherMap API key

function getWeather() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeather(location);
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(null, lat, lon);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }
}

function fetchWeather(location, lat = null, lon = null) {
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
    if (location) {
        url += `&q=${location}`;
    } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to retrieve weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    if (data.cod === 200) {
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherInfo.innerHTML = `
            <h2>${data.name}</h2>
            <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
    } else {
        weatherInfo.innerHTML = `<p>Location not found. Please try again.</p>`;
    }
}
