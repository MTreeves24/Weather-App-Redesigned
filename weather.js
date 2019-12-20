// var loc = document.querySelector(".location");


//geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosSuccess, getPosErr)
      } else {
          alert(`Geolocation not available`)
      };


async function getPosSuccess(pos){
    const geoLat = pos.coords.latitude;
    const geoLong = pos.coords.longitude;
    const geoAcc = pos.coords.accuracy;
    console.log(`${geoLat}, ${geoLong}`)
    const apiKey = `6f4fe0fb1959811162e60dcd1b5a9ee7`
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const weatherData = await fetch (`${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${geoLat}&lon=${geoLong}&units=metric&appid=${apiKey}`)
    const showData = await weatherData.json();
    console.log(showData)
    let location = document.querySelector(".location").innerHTML = showData.name;
    let summary = document.querySelector(".summary").innerHTML = showData.weather[0].main;
    document.querySelector(".wind-speed").innerHTML = `Wind: ${showData.wind.speed} mph`;
    document.querySelector(".temp").innerHTML = Math.round(showData.main.temp);
    document.querySelector(".cloud-cover").innerHTML = `Cloud Cover: ${showData.clouds.all}%`;

    //ICONS******************************************************************
    document.querySelector(".icon p").innerHTML = `<i class="wi wi-owm-day-${showData.weather[0].id}"></i>`;
    
    //ICONS******************************************************************

    //CHANGE-UNIT BUTTONS**********************************************
    let unit = document.querySelector(".unit").innerHTML = "&degC"
    const changeF = document.querySelector(".changeF")
    const changeC = document.querySelector(".changeC")

    changeF.addEventListener("click",() => {
        changeF.classList.add("button-active")
        changeC.classList.remove("button-active")
        unit.innerHTML = "&degF"
        document.querySelector(".temp").innerHTML = Math.floor(showData.main.temp * 9/5 + 32);
    })
    changeC.addEventListener("click",() => {
        changeC.classList.add("button-active")
        changeF.classList.remove("button-active")
        unit.innerHTML = "&degC"
        document.querySelector(".temp").innerHTML = Math.round(showData.main.temp);
    })
        //****************************************************************   
}
function getPosErr(err){
    switch (err.code){
        case err.PERMISSION_DENIED:
        alert("User denied the request for Geolocation");
        break;
        case err.POSITION_UNAVAILABLE:
        alert("Location information is unavailable")
        break;
        case err.TIMEOUT:
        alert("The request to get user location timed out")
        break;
        default:
        alert("An unknown error occurred")
    }
}






// async function showPosition(){
//     let position = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat} ,${long}key=AIzaSyAErl2Y9MD-u1q27zVXM2yWoocgyehN-ZU`)
//     let positionParsed = await position.json()
//     console.log(positionParsed)
// }

// function showPosition(position) {
//     const lat = position.coords.latitude;
//     const long = position.coords.longitude;
// console.log(lat + " " + long)
// var locReq = new XMLHttpRequest();
//     locReq.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyAErl2Y9MD-u1q27zVXM2yWoocgyehN-ZU");
//     locReq.onload = () => {
//     var locData = JSON.parse(locReq.responseText);
//     var cityName = locData.results[0].address_components[1].long_name;
//     var countyName = locData.results[0].address_components[3].long_name;
//     loc.innerHTML = cityName + ", " + countyName;


// var weatherReq = new XMLHttpRequest();
//     weatherReq.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=6f4fe0fb1959811162e60dcd1b5a9ee7");
//     weatherReq.onload = function(){
//     var weatherData = JSON.parse(weatherReq.responseText);
//         var summary = document.querySelector(".summary")
//         summary = summary.innerHTML = weatherData.weather[0].main;
//         document.querySelector(".wind-speed").innerHTML = "Wind: " + weatherData.wind.speed + "mph";
//         document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp);
//         unit.innerHTML = "&degC"

//         document.querySelector(".cloud-cover").innerHTML = "Cloud Cover: " + weatherData.clouds.all + "%";






// weatherReq.send();
// }
// locReq.send();
// }


// getLocation();

// setTimeout(() => {
//     const notLoaded = document.querySelector(".icon p");
//     notLoaded.style.display = "block";
// },6000);