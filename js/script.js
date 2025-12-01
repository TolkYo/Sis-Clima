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
    const data = await res.json();
    return data;
};

const getDadosClimaCoords = async (lat, lon) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data;
};

function atualizarUI(data) {
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`; 
}

const mostraClima = async () => {
    const cidade = inputCidade.value.trim();

    if (cidade) {
        const data = await getDadosClima(cidade);
        atualizarUI(data);
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    const data = await getDadosClimaCoords(lat, lon);
                    atualizarUI(data);
                },
                (err) => {
                    alert("Não foi possível obter a localização.");
                    console.error(err);
                }
            );
        } else {
            alert("Geolocalização não é suportada neste navegador.");
        }
    }
};

pesquisaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mostraClima();
});