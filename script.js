
// Call the current weather API
function getCurrentWeatherApi(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64b3e96d4c6a9a51fe9aadbacbdc1c51`;

    return fetch(url).then(function (response) {
        return response.json();
    });
}

// Call onecall API
function getOneCallApi(lon, lat) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=64b3e96d4c6a9a51fe9aadbacbdc1c51`

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

const searchForm = document.getElementById('form-search');

function kelvinToCelcius(kelvin) {
    const temp = kelvin - 273.15
    return temp.toFixed(2)

}

function iconCodeToPic(iconCode) {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`
}

function capitalizeFirstLetter(userInput) {
    return userInput.charAt(0).toUpperCase() + userInput.slice(1);
}

function clearCard(todayWeatherCard) {
    return todayWeatherCard.innerHTML = " ";
}


function printExistingLocalStorageBtns() {
    const localTarget = document.querySelector('#local-target');
    clearCard(localTarget);

    const itemLocal = localStorage;

    for (let index = 0; index < itemLocal.length; index++) {
        const localBtns = document.createElement('button');
        localBtns.classList.add('btn')
        localBtns.classList.add('btn-seconday')
        localBtns.classList.add('btn-two')
        const name = capitalizeFirstLetter(itemLocal.key(index));
        localBtns.innerHTML = name;
        localBtns.setAttribute('id', name)
        localTarget.appendChild(localBtns);
        localBtns.addEventListener('click', function () {
            const btnInput = name;
            console.log(btnInput)
            const userInputForm = document.getElementById('input-city');
            userInputForm.value = btnInput;
            userInputForm.submit();
            // document.getElementById("input-city").submit(btnInput);
            // document.forms["userInputForm"].submit();


        });

    }

}

function itemsToLocalStorage(weatherData, userInput) {
    const localData = JSON.stringify(weatherData)
    window.localStorage.setItem(userInput, localData);
    printExistingLocalStorageBtns();
}


searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // When the user enters a city name
    // Call weather API to retrieve weather data by city name

    const userInputForm = document.getElementById('input-city');

    if (userInputForm.value == " ") {
        alert("Please enter a City")
        return;
    }


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

            // Graphic
            const icon = iconCodeToPic(weatherData.current.weather[0].icon);
            document.getElementById("img-today-icon").src = icon;

            // Wind
            const wind = weatherData.current.wind_speed
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

            // Day + 3
            const day3Card = document.createElement('div');
            day3Card.classList.add('card')
            day3Card.classList.add('card-body')
            day3Card.classList.add('VWcard')
            const ul3 = document.createElement('ul')
            ul3.classList.add('card-ul')

            let dayThr = new Date();
            const ddThr = String(dayThr.getDate() + 3).padStart(2, '0');
            const mmThr = String(dayThr.getMonth() + 1).padStart(2, '0');
            const yyyyThr = dayThr.getFullYear();
            dayThr = `${ddThr}/${mmThr}/${yyyyThr}`;

            const date3Li = document.createElement('p');
            date3Li.textContent = `${dayThr}`;
            ul3.appendChild(date3Li);

            // Graphic
            const iconThr = iconCodeToPic(weatherData.daily[2].weather[0].icon);
            const imgThr = document.createElement('img')
            imgThr.src = iconThr;
            ul3.appendChild(imgThr)

            // Temperature
            const tempThr = kelvinToCelcius(weatherData.daily[2].temp.day);
            const tempThrLi = document.createElement('li')
            tempThrLi.textContent = `Temp ${tempThr}℃`
            ul3.appendChild(tempThrLi)

            // Wind
            const windThr = weatherData.daily[2].wind_speed;
            const windThrLi = document.createElement('li');
            windThrLi.textContent = `Wind ${windThr}km/h`;
            ul3.appendChild(windThrLi);

            // Humidity
            const humidThr = weatherData.daily[2].humidity;
            const humidThrLi = document.createElement('li');
            humidThrLi.textContent = `Humidity ${humidThr} %`;
            ul3.appendChild(humidThrLi);

            day3Card.appendChild(ul3);

            // Day + 4
            const day4Card = document.createElement('div');
            day4Card.classList.add('card')
            day4Card.classList.add('card-body')
            day4Card.classList.add('VWcard')
            const ul4 = document.createElement('ul')
            ul4.classList.add('card-ul')

            let dayFor = new Date();
            const ddFor = String(dayFor.getDate() + 4).padStart(2, '0');
            const mmFor = String(dayFor.getMonth() + 1).padStart(2, '0');
            const yyyyFor = dayFor.getFullYear();
            dayFor = `${ddFor}/${mmFor}/${yyyyFor}`;

            const date4Li = document.createElement('p');
            date4Li.textContent = `${dayFor}`;
            ul4.appendChild(date4Li);

            // Graphic
            const iconFor = iconCodeToPic(weatherData.daily[3].weather[0].icon);
            const imgFor = document.createElement('img')
            imgFor.src = iconFor;
            ul4.appendChild(imgFor)

            // Temperature
            const tempFor = kelvinToCelcius(weatherData.daily[3].temp.day);
            const tempForLi = document.createElement('li')
            tempForLi.textContent = `Temp ${tempFor}℃`
            ul4.appendChild(tempForLi)

            // Wind
            const windFor = weatherData.daily[3].wind_speed;
            const windForLi = document.createElement('li');
            windForLi.textContent = `Wind ${windFor}km/h`;
            ul4.appendChild(windForLi);

            // Humidity
            const humidFor = weatherData.daily[3].humidity;
            const humidForLi = document.createElement('li');
            humidForLi.textContent = `Humidity ${humidFor} %`;
            ul4.appendChild(humidForLi);

            day4Card.appendChild(ul4);

            // Day + 5
            const day5Card = document.createElement('div');
            day5Card.classList.add('card')
            day5Card.classList.add('card-body')
            day5Card.classList.add('VWcard')
            const ul5 = document.createElement('ul')
            ul5.classList.add('card-ul')

            let dayFiv = new Date();
            const ddFiv = String(dayFiv.getDate() + 5).padStart(2, '0');
            const mmFiv = String(dayFiv.getMonth() + 1).padStart(2, '0');
            const yyyyFiv = dayFiv.getFullYear();
            dayFiv = `${ddFiv}/${mmFiv}/${yyyyFiv}`;

            const date5Li = document.createElement('p');
            date5Li.textContent = `${dayFiv}`;
            ul5.appendChild(date5Li);

            // Graphic
            const iconFiv = iconCodeToPic(weatherData.daily[4].weather[0].icon);
            const imgFiv = document.createElement('img')
            imgFiv.src = iconFiv;
            ul5.appendChild(imgFiv)

            // Temperature
            const tempFiv = kelvinToCelcius(weatherData.daily[4].temp.day);
            const tempFivLi = document.createElement('li')
            tempFivLi.textContent = `Temp ${tempFiv}℃`
            ul5.appendChild(tempFivLi)

            // Wind
            const windFiv = weatherData.daily[4].wind_speed;
            const windFivLi = document.createElement('li');
            windFivLi.textContent = `Wind ${windFiv}km/h`;
            ul5.appendChild(windFivLi);

            // Humidity
            const humidFiv = weatherData.daily[4].humidity;
            const humidFivLi = document.createElement('li');
            humidFivLi.textContent = `Humidity ${humidFiv} %`;
            ul5.appendChild(humidFivLi);

            day5Card.appendChild(ul5);


            forecast.appendChild(day1Card);
            forecast.appendChild(day2Card);
            forecast.appendChild(day3Card);
            forecast.appendChild(day4Card);
            forecast.appendChild(day5Card);

            // Save data to local storage
            itemsToLocalStorage(weatherData, userInput);

            return;
        })
    userInputForm.value = " ";

    // Show the cards
    const cards = document.querySelectorAll('.hide')
    cards.forEach(card => {
        card.classList.remove('hide');
    })
})



printExistingLocalStorageBtns();