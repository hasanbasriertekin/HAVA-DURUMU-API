const url = "https://api.openweathermap.org/data/2.5/";
const key = "bf918d3d59b5a72b1589dbff767e407e";

const setQuery = (e) => {
  if (e.keyCode == "13") {
    if (e.target.value == "") {
      alert("Lütfen Şehir İsmi Giriniz!");
    } else {
      getResult(searchBar.value);
    }
  }
};
const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult)
    .catch(() => { 
      if (window.confirm("Lütfen Düzgün Şehir İsmi Giriniz. Yoksa Bu Programdan Hayır Beklemeyin Gidin Hızlıca Abdest Alın")) {
        window.open("https://quickabdest.com/", "_blank");
      }else{
        alert("Bizde Abdest Zorunlu")
        window.open("https://quickabdest.com/", "_blank");
      }
    });
};

const displayResult = (result) => {
  console.log(result);
  let city = document.querySelector(".city");
  city.innerText = `${result.name},${result.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerText = `${Math.round(result.main.temp)}` + `°C`;

  let desc = document.querySelector(".desc");
  desc.innerHTML = `<img src="http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png" /> ${result.weather[0].description}`;

  let minMax = document.querySelector(".minmax");
  minMax.innerText =
    `${Math.round(result.main.temp_min)}` +
    `°C` +
    " " +
    "/" +
    " " +
    `${Math.round(result.main.temp_max)}` +
    `°C`;
};

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);
