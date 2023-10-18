const API_KEY = '815efac0c8380b362f353d86255cc4f7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const elements = {
    form: document.querySelector('.query'),
    list: document.querySelector('.js-list'),
}

elements.form.addEventListener('submit', handlerForecast)

function handlerForecast(e) {
    e.preventDefault();
    const { city } = e.currentTarget.elements;
    oneCallWeather(city.value)
        .then((data) => elements.list.innerHTML = createMarkup(data.list))
        .catch ((err) => alert(err))
}

function createMarkup(arr) {
  return arr.map(({ dt_txt, main: { temp, feels_like, pressure, humidity }, weather: [{ main, icon }] }) => {
    temp = Math.round(temp); // Округляем температуру
    
    feels_like = Math.round(feels_like); // Округляем "відчувається як"

    return `
    <li class="weather-card">
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" width="150" height="150">
      <div class="date"><b>${dt_txt}</b></div>
      
        <div class="temperature">${temp}° <span>(відчувається як ${feels_like}°)</span></div>
      
      <div class="description">${main}</div>
      <div class="additional">вологість ${humidity}%, тиск ${pressure} мм рт. ст.</div>
      
    </li>
    `;
  }).join('');
}

   
function oneCallWeather(city) {
    return fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error(response.statusText || 'Щось пішло не так')
            }
        
            return response.json()
        });
}