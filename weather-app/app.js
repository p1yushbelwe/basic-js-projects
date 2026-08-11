let cityName = document.getElementById('cityName')
let currentTemp = document.getElementById('currentTemp')

let forecastTime = document.getElementById('time')
let forecastIcon = document.getElementById('icon')
let forecastTemp = document.getElementById('temp')

let sunrise = document.getElementById('sunrise')
let sunset = document.getElementById('sunset')


let getButton = document.getElementById('getButton');
let userWeather = document.getElementById('userWeather');

const sun = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`


const cloud = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-icon lucide-cloud"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`


const rain = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-hail-icon lucide-cloud-hail"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v2"/><path d="M8 14v2"/><path d="M16 20h.01"/><path d="M8 20h.01"/><path d="M12 16v2"/><path d="M12 22h.01"/></svg>`


const moon = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-moon-icon lucide-cloud-moon"><path d="M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z"/><path d="M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36"/></svg>`

const API_KEY = `c9821a831e54640c0970eaa26ec9ab5c`

function displayData(data, location) {
    let span = document.createElement('span')

    span.innerHTML = `${data}`

    location.appendChild(span);
}

const forecast = document.getElementById('forecast')

function displayForecast(time, temp, icon) {
    forecast.insertAdjacentHTML('beforeend', `
        
        <div class="flex flex-col w-1/4 items-center justify-around text-white/40 text-[16px]">
            <span class="text-[14px]">${time}</span>
            <span class="text-white/50">
                ${icon}
            </span>
            <span class="text-white/60">${temp}°<span class="text-[16px]">C</span></span>
        </div>

    `)
}





async function getCoordinates(city, countryCode) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&APPID=${API_KEY}`)

        if (!response.ok) {
            throw new Error()
        }

        const data = await response.json()
        console.log(data);

        let coord = {
            lat: data.coord.lat,
            long: data.coord.lon,
            country: data.sys.country,
            name: data.name
        }

        return coord;
    } catch (error) {
        console.log("Empty");
        return false;

    }

}

async function getWeather(cityName, countryCode) {

    try {

        const coord = await getCoordinates(cityName, countryCode);
        if (!coord) {
            console.log('false');

            return
        }
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${coord.lat}&longitude=${coord.long}&daily=sunrise,sunset&hourly=temperature_2m,rain,cloud_cover,dew_point_2m,precipitation&current=temperature_2m,precipitation,rain,weather_code&timezone=auto&forecast_days=1`;

        console.log(URL);

        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Something went wrong!")
        }
        const data = await response.json();

        // 12 7 1 10
        const weatherData = {
            name: coord.name,
            country: coord.country,
            current: data.current.temperature_2m,
            hourly1: data.hourly.temperature_2m[0],
            hourly2: data.hourly.temperature_2m[7],
            hourly3: data.hourly.temperature_2m[12],
            hourly4: data.hourly.temperature_2m[22],
            sunrise: data.daily.sunrise[0],
            sunset: data.daily.sunset[0]
        }

        console.log(weatherData);


        return weatherData



    } catch (error) {
        return false
    }
}


function convert(string) {
    const dateObj = new Date(string);

    // 2. Format to show time only (12-hour clock)
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });


    return formattedTime
}

function reset() {
    forecast.innerHTML = "";
    cityName.innerHTML = "";
    currentTemp.innerHTML = "";
    sunrise.innerHTML = ""
    sunset.innerHTML = ""
}


getButton.addEventListener('click', function (e) {
    e.stopPropagation();
    if (userWeather.value === "") {
        return
    }

    try {
        const data = getWeather(userWeather.value, 'in')
        reset()
        data.then(function (obj) {

            if (!obj) {
                return
            }

            displayForecast('12 PM', obj.hourly1, moon)
            displayForecast('7 AM', obj.hourly2, cloud)
            displayForecast('1 PM', obj.hourly3, sun)
            displayForecast('10 PM', obj.hourly4, rain)


            displayData(`${obj.name}, ${obj.country}`, cityName)
            displayData(obj.current, currentTemp)

            displayData(convert(obj.sunrise), sunrise)
            displayData(convert(obj.sunset), sunset)

        })
    } catch (error) {
        alert('City Not Found!')
    }





})
