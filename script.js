let weather = {
    apiKey: "c67dbb3cd3be0c4fdad23ff12579e44b",
    fetchWeather: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=imperial&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { country } = data.sys
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, country, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = `${name}, ${country}`;
        document.querySelector(".temp").innerText = `${Math.round(temp)}°F`;
        document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`
        document.querySelector(".description").innerText = `${description.charAt(0).toUpperCase() + description.slice(1)}`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind: ${speed}`;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
}

document.querySelector(".search button").addEventListener('click', function () {
     weather.search();
})

document.querySelector(".searchbar").addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.querySelector(".search button").click();
    }
})