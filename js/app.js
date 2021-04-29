// clave api

const api = {
        key: "7c6c611a91fef05ff64dd7353f5bba59",
        url: "https://api.openweathermap.org/data/2.5/weather"
    }
    //let URL = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

//variables del DOM
const card = document.getElementById('card')

const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

const alert = document.getElementById('alert-404')
    //funcion de request

const request = async(url) => {
    const response = await fetch(url);
    if (!response.ok || response.status === 404)
        throw new Error("Error", response.status);

    const data = await response.json();
    return data;
}

const upDateImage = (data) => {
    const temp = celsius(data.main.temp);
    let src = "../img/temp-mid.png"
    if (temp > 26) {
        src = "../img/temp-high.png"
    } else if (temp < 20) {
        src = "../img/temp-low.png"
    }
    tempImg.src = src

}

//peticion Ajax

const search = async(query, pais) => {
    try {

        const res = await request(`https://api.openweathermap.org/data/2.5/weather?q=${query},${pais}&appid=${api.key}`)
            //onst response = await request(`http://api.openweathermap.org/data/2.5/weather?id=${mas[0].id}&appid=${api.key}&lang=es`)
        const data = res
        card.style.display = "block"
        city.innerHTML = `${data.name}, ${data.sys.country}`
        date.textContent = (new Date().toLocaleDateString())
        temp.textContent = `${celsius(data.main.temp)}`
        weather.textContent = data.weather[0].description
        range.textContent = `${celsius(data.main.temp_min)}C /${celsius(data.main.temp_max)}C`
        upDateImage(data)

    } catch (error) {
        alert.classList.remove("none")
        alert.textContent = "pagina no encontrada"
        setTimeout(() => {
            alert.classList.add("none")
        }, 3000)


    }
}





//funciones 
const celsius = (kelvin) => {
    return Math.round(kelvin - 273.15)
}

const onSubmit = (e) => {
    e.preventDefault()
    search(searchbox.value, pais.value)
}

const searchform = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
const pais = document.getElementById('pais')
searchform.addEventListener('submit', onSubmit, true);