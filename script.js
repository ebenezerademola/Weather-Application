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
        const { country, sunrise, sunset } = data.sys
        const { icon, description } = data.weather[0];
        const { temp, humidity, feels_like } = data.main;
        const { speed } = data.wind;
        console.log(name, country, sunrise, sunset, icon, description, feels_like, temp, humidity, speed)
        document.querySelector(".city").innerText = `${name}, ${country}`;
        //document.querySelector(".sunrise-txt").innerText = ` ${sunrise}`;
        //document.querySelector(".sunset-txt").innerText = ` ${sunset}`;
        document.querySelector(".temp").innerText = `${Math.round(temp)}°F`;
        document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`
        document.querySelector(".description").innerText = `${description}`;
        document.querySelector(".feel").innerText = `Feels like ${Math.round(feels_like)}°F`
        document.querySelector(".humidity-txt").innerText = `${humidity}%`;
        document.querySelector(".wind-txt").innerText = `${speed} mph`;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}, ${description}')`;
        
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchbar").value);
    },
    
}

// function suntime(x) {
//     let dateObj = new Date(x * 1000);

//     let hours = dateObj.getUTCHours.toString.padStart(2,0);
//     let minutes = dateObj.getUTCMinutes.toString.padStart(2,0);
//     let seconds = dateObj.getUTCSeconds.toString.padStart(2,0);

//     console.log(` Time is ${hours}:${minutes}:${seconds}`);
//     return `${hours}:${minutes}:${seconds}`;
// }

document.querySelector(".search button").addEventListener('click', function () {
     weather.search();
})

document.querySelector(".searchbar").addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.querySelector(".search button").click();
    }
})

