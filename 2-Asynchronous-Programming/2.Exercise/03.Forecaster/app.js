function attachEvents() {
    let locationInput = document.getElementById('location');
    let getWeatherBtn = document.getElementById('submit');
    let forecast = document.getElementById('forecast');

    let currentSection = document.getElementById('current');
    let upcomingSection = document.getElementById('upcoming');
    let currentForecastLabel = document.querySelector('#forecast #current .label');
    let upcomingForecastLabel = document.querySelector('#forecast #upcoming .label');

    getWeatherBtn.addEventListener('click', getLocation);

    let conditions = {
        'Sunny'() {
            return '&#x2600';
        },
        'Partly sunny'() {
            return '&#x26C5';
        },
        'Overcast'() {
            return '&#x2601';
        },
        'Rain'() {
            return '&#x2614';
        },
        'Degrees'() {
            return '&#176';
        },
    }

    async function getLocation() {
        getWeatherBtn.disabled = true;
        let url = 'http://localhost:3030/jsonstore/forecaster/locations';

        let currentForecasts = document.querySelector('.forecasts');
        let upcomingForecast = document.querySelector('.forecasts-info');

        if (currentForecasts) {
            currentForecasts.replaceWith();
            upcomingForecast.replaceWith();
        }

        forecast.style.display = 'none';
        upcomingSection.style.display = ''
        currentForecastLabel.textContent = 'Loading...';
        upcomingForecastLabel.textContent = 'Loading...';

        try {
            let res = await fetch(url);
            let data = await res.json();

            let [code] = data.filter(e => e.name.toLowerCase() === locationInput.value.toLowerCase());

            location.value = '';

            if (code === undefined || res.status !== 200) {
                throw new Error('Error')
            }
            forecast.style.display = 'block';
            await Promise.all([getCurrent(code), getUpcoming(code)]);

        } catch (e) {
            forecast.style.display = '';
            currentForecastLabel.textContent = e.message;
            console.log(e.message);
            upcomingSection.style.display = 'none';
        }

        getWeatherBtn.disabled = false;
    }

    async function getCurrent(code) {
        let url = `http://localhost:3030/jsonstore/forecaster/today/${code.code}`;

        let res = await fetch(url);
        let data = await res.json();

        currentForecastLabel.textContent = 'Current conditions';

        let { forecast: { condition, high, low } } = data;
        let cityLocation = data.name;

        let conditionCode = conditions[condition]();

        let todayForecast = create('div', { className: 'forecasts' },
            create('span', { className: 'condition symbol' }, conditionCode),
            create('span', { className: 'condition' },
                create('span', { className: 'forecast-data' }, cityLocation),
                create('span', { className: 'forecast-data' }, `${low}${conditions['Degrees']()}/${high}${conditions['Degrees']()}`),
                create('span', { className: 'forecast-data' }, condition)
            ));

        currentSection.appendChild(todayForecast);
    }

    async function getUpcoming(code) {
        let url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code.code}`;

        let res = await fetch(url);
        let data = await res.json();

        upcomingForecastLabel.textContent = 'Three-day forecast';

        let upcomingForecast = document.createElement('div');
        upcomingForecast.className = 'forecasts-info';

        for (let day = 1; day <= data['forecast'].length; day++) {
            let { condition, high, low } = data['forecast'][day - 1];
            let conditionCode = conditions[condition]();

            let currentDayForecast = create('span', { className: 'upcoming' },
                create('span', { className: 'symbol' }, conditionCode),
                create('span', { className: 'forecast-data' }, `${low}${conditions['Degrees']()}/${high}${conditions['Degrees']()}`),
                create('span', { className: 'forecast-data' }, condition)
            );
            upcomingForecast.appendChild(currentDayForecast);
        }
        upcomingSection.appendChild(upcomingForecast);
    }

    function create(type, attributes, ...content) {
        let element = document.createElement(type);

        for (const property in attributes) {
            element[property] = attributes[property];
        }

        for (let el of content) {
            if (typeof el === 'string' || typeof el === 'number') {
                if (el.startsWith('&') || Number.isInteger(Number(el[0]))) {
                    element.innerHTML = el;
                    continue;
                }
                el = document.createTextNode(el);
            }
            element.appendChild(el);
        }
        return element
    }
}

attachEvents();