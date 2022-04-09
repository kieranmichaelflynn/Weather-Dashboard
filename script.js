const weatherApiKey = "64b3e96d4c6a9a51fe9aadbacbdc1c51"

// Call the current weather API
function getCurrentWeatherApi(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;

    return fetch(url).then(function (response) {
        return response.json();
    });
}

// Call onecall API
function getOneCallApi(lon, lat) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`

    return fetch(url).then(function (res) {
        return res.json();
    })

}

function getWeather(city) {
    return getCurrentWeatherApi(city)
        .then(function (data) {
            const lon = data.coord.lon
            const lat = data.coord.lat
            return getOneCallApi(lon, lat);
        });
}

const searchForm = document.getElementById('form-search')

function kelvinToCelcius(kelvin) {
    const temp = kelvin - 273.15
    return temp.toFixed(2)

}

function iconCodeToPic(iconCode) {
    console.log(iconCode)
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`
}

function capitalizeFirstLetter(userInput) {
    return userInput.charAt(0).toUpperCase() + userInput.slice(1);
}

function clearCard(todayWeatherCard) {
    return todayWeatherCard.innerHTML = " ";
}


searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // When the user enters a city name
    // Call weather API to retrieve weather data by city name

    const userInput = document.getElementById('input-city').value;
    document.getElementById('today-city').textContent = `${capitalizeFirstLetter(userInput)} Weather`;

    getWeather(userInput)
        .then(function (weatherData) {

            console.log(weatherData)

            // Data that we need
            // For today

            const todayWeatherCard = document.querySelector('#today-weather-card')
            // Remove any existing information from card
            clearCard(todayWeatherCard);


            // Temperature

            const tempToday = kelvinToCelcius(weatherData.current.temp);
            const tempLi = document.createElement('li')
            tempLi.textContent = `Temperature is ${tempToday} ℃`
            todayWeatherCard.appendChild(tempLi)


            // // Graphic
            const icon = iconCodeToPic(weatherData.current.weather[0].icon);
            document.getElementById("img-today-icon").src = icon;

            // Wind
            const wind = weatherData.current.wind_speed
            console.log(wind)
            const windLi = document.createElement('li');
            windLi.textContent = `Wind Speed ${wind} km/h`
            todayWeatherCard.appendChild(windLi)

            // Humidity
            const humidity = weatherData.current.humidity
            const humidityLi = document.createElement('li');
            humidityLi.textContent = `Humidity is ${humidity} %`
            todayWeatherCard.appendChild(humidityLi)


            // UV index
            const UVindex = weatherData.daily[0].uvi;
            const UVindexLi = document.createElement('li');
            if (UVindex >= 6) {
                UVindexLi.textContent = `UV Index is ${UVindex} Use sun protection!`
            } else {
                UVindexLi.textContent = `UV Index is ${UVindex}`
            }
            todayWeatherCard.appendChild(UVindexLi)




            /*
            I want 

            <ul>
            <li id="temp"></li>
            <li id="graphic"></li>
            <li id="wind"></li>
            <li id="humidity"></li>
            <li id="UV index"></li>
            </ul>
            */

            // For next 5 days
            const forecast = document.querySelector('#five-day-forecast');
            clearCard(forecast);

            // Day + 1
            const day1Card = document.createElement('div');
            day1Card.classList.add('card')
            day1Card.classList.add('card-body')
            day1Card.classList.add('VWcard')
            const ul1 = document.createElement('ul')
            ul1.classList.add('card-ul')

            let day1 = new Date();
            const dd = String(day1.getDate() + 1).padStart(2, '0');
            const mm = String(day1.getMonth() + 1).padStart(2, '0');
            const yyyy = day1.getFullYear();
            day1 = `${dd}/${mm}/${yyyy}`;

            const date1Li = document.createElement('p');
            date1Li.textContent = `${day1}`;
            ul1.appendChild(date1Li);

            // Graphic
            const iconOne = iconCodeToPic(weatherData.daily[0].weather[0].icon);
            const imgOne = document.createElement('img')
            imgOne.src = iconOne;
            ul1.appendChild(imgOne)

            // Temperature
            const tempOne = kelvinToCelcius(weatherData.daily[0].temp.day);
            const tempOneLi = document.createElement('li')
            tempOneLi.textContent = `Temp ${tempOne}℃`
            ul1.appendChild(tempOneLi)

            // Wind
            const windOne = weatherData.daily[0].wind_speed;
            const windOneLi = document.createElement('li');
            windOneLi.textContent = `Wind ${windOne}km/h`;
            ul1.appendChild(windOneLi);

            // Humidity
            const humidOne = weatherData.daily[0].humidity;
            const humidOneLi = document.createElement('li');
            humidOneLi.textContent = `Humidity ${humidOne} %`;
            ul1.appendChild(humidOneLi);

            day1Card.appendChild(ul1);

            // Day + 2
            const day2Card = document.createElement('div');
            day2Card.classList.add('card')
            day2Card.classList.add('card-body')
            day2Card.classList.add('VWcard')
            const ul2 = document.createElement('ul')
            ul2.classList.add('card-ul')

            let dayTwo = new Date();
            const ddTwo = String(dayTwo.getDate() + 2).padStart(2, '0');
            const mmTwo = String(dayTwo.getMonth() + 1).padStart(2, '0');
            const yyyyTwo = dayTwo.getFullYear();
            dayTwo = `${ddTwo}/${mmTwo}/${yyyyTwo}`;

            const date2Li = document.createElement('p');
            date2Li.textContent = `${dayTwo}`;
            ul2.appendChild(date2Li);

            // Graphic
            const icontwo = iconCodeToPic(weatherData.daily[1].weather[0].icon);
            const imgtwo = document.createElement('img')
            imgtwo.src = icontwo;
            ul2.appendChild(imgtwo)

            // Temperature
            const temptwo = kelvinToCelcius(weatherData.daily[1].temp.day);
            const temptwoLi = document.createElement('li')
            temptwoLi.textContent = `Temp ${temptwo}℃`
            ul2.appendChild(temptwoLi)

            // Wind
            const windtwo = weatherData.daily[1].wind_speed;
            const windtwoLi = document.createElement('li');
            windtwoLi.textContent = `Wind ${windtwo}km/h`;
            ul2.appendChild(windtwoLi);

            // Humidity
            const humidtwo = weatherData.daily[1].humidity;
            const humidtwoLi = document.createElement('li');
            humidtwoLi.textContent = `Humidity ${humidtwo} %`;
            ul2.appendChild(humidtwoLi);

            day2Card.appendChild(ul2);


            forecast.appendChild(day1Card);
            forecast.appendChild(day2Card);

            return todayWeatherCard;
        })

    // Show the cards
    const cards = document.querySelectorAll('.hide')
    cards.forEach(card => {
        card.classList.remove('hide');
    })
})
