let weather = {
    apiKey: "7cbaf9080584e93d756d1e93ba5c46c8",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey + "&units=metric")
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => this.displayWeather(data))
            .catch(error => {
                console.error('Error fetching weather data:', error.message);
                // Display an appropriate error message to the user
                alert('Error fetching weather data. Please try again later.');
            });
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = 'Weather in ' + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + '°C';
        document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + "%";
        document.querySelector('.wind').innerText = 'Wind: ' + speed + "km/h";
        document.querySelector(".weather").classList.remove('loading');
    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector('.search-bar').addEventListener("keydown", function(e) {
    if (e.key == 'Enter') {
        weather.search();
    }
});

weather.fetchWeather("Brooklyn, NY");
