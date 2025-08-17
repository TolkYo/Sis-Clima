const apiKey = "fbfc96432e77d42f0ee0bb5d7bde8659";

const inputCidade = document.querySelector("#nomeCidade");
const pesquisaBtn = document.querySelector("#procurar");

const cityElement = document.querySelector("#cidade");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#descricaoClima");
const weatherIconElement = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#umidade span");
const windElement = document.querySelector("#vento span");

const getDadosClima = async (cidade) => {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiUrl);
    const data = await res.json()

    return data;

}

const mostraClima = async (cidade) => {
    const data = await getDadosClima(cidade);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`;
};



pesquisaBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const cidade = inputCidade.value;

    if(cidade){
        mostraClima(cidade);
    }
});