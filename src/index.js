const city1 = document.querySelector("div[data-city='1']");
const city2 = document.querySelector("div[data-city='2']");
const city3 = document.querySelector("div[data-city='3']");
const city4 = document.querySelector("div[data-city='4']");
const city5 = document.querySelector("div[data-city='5']");
const city6 = document.querySelector("div[data-city='6']");

const cityBack1 = document.querySelector("div[data-city='21']");
const cityBack2 = document.querySelector("div[data-city='22']");
const cityBack3 = document.querySelector("div[data-city='23']");
const cityBack4 = document.querySelector("div[data-city='24']");
const cityBack5 = document.querySelector("div[data-city='25']");
const cityBack6 = document.querySelector("div[data-city='26']");

const arrCity = [city1, city2, city3, city4, city5, city6]
const arrCityBack = [cityBack1, cityBack2, cityBack3,cityBack4,cityBack5,cityBack6]

const cities = ["Kyiv","Lviv", "Odesa", "Doha", "Mirissa", "Krabi"] 

const getWeather = async () => {

    const BASE_URL = "http://api.weatherapi.com/v1/current.json";
    const API_KEY = "53d51b3de44f43c5a8f183833232309"

    const arrayOfPromisses = cities.map(async (city) => {
        const resp = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}`)
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }
        return resp.json()
    })

    const weather = await Promise.all(arrayOfPromisses);
return weather

}

getWeather().then(data => {

    data.forEach((item, idx) => {
        console.log(item)
        arrCity[idx].innerHTML = createMarkupFront(item);
        arrCityBack[idx].innerHTML = createMarkupBack(item)
 })
  
})

function createMarkupFront(arr) {
  
        return ` <div class="city_item_title_wrapper">
            <h2 class="city_item_title">${arr.location.name}</h2>
            <img class="circle" src="${arr.current.condition.icon}" alt="weather icon">
          </div>
          <h3 class="city_item_temp_title">${arr.current.temp_c}C&#176;</h3>
          <p class="real_feel">Real feel ${arr.current.feelslike_c}C&#176</p>
          <div class="city_item_text_wrapper">
            <p class="city_item_text">Wind: ${arr.current.wind_kph} kph</p>
            <p class="city_item_text">Pressure: ${arr.current.pressure_mb} mb</p>
          </div>`
}
    

function createMarkupBack(arr) {
  
        return ` 
            <p class="city_item_text">Humidity: ${arr.current.humidity}%</p>
            <p class="city_item_text">Pressure: ${arr.current.pressure_mb} mb</p>
            <p class="city_item_text">Wind: ${arr.current.wind_kph} kph</p>
            <p class="city_item_text">Pressure: ${arr.current.pressure_mb} mb</p>
        `
    }


