console.log("JAVASCRIPT LOADED!!!");
const weatherData = document.querySelector("#weatherData");
const nameDisplay = document.querySelector("#locationName");
const searchForm = document.querySelector("#searchForm");
const options = {
  method: 'GET',
  headers: {

  }
};
if (weatherData.innerHTML == ""){
  weatherData.style.display = "none";
}

const getWeather = async (id) => {
  try {
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9b9179942dd149a887903158223007&q=${id}&days=10&aqi=no&alerts=no`, options);
    const data = await res.json();
    console.log("RESPONSE DATA: ", data);
    if (data) {
      weatherData.style.display = "flex";
    }
    nameDisplay.innerHTML = `${data.location.name}, ${data.location.country}`
    if(data.location.region){nameDisplay.innerHTML = `${data.location.name}, ${data.location.region}, ${data.location.country}`};
    const currentLocation = document.createElement("P");
    currentLocation.id = "currentLocation";
    currentLocation.innerHTML = `${data.location.name}`;
    const currentTemp = document.createElement("P");
    currentTemp.id = "currentTemp";
    currentTemp.innerHTML = `${Math.floor(data.current.temp_f)}°`;
    weatherData.append(currentLocation);
    weatherData.append(currentTemp);
    const currentDescription = document.createElement("P");
    currentDescription.id = "currentDescription";
    currentDescription.innerHTML = `${data.current.condition.text}`;
    weatherData.append(currentDescription);
    const minMaxTemps = document.createElement("P");
    minMaxTemps.id = "minMaxTemps";
    minMaxTemps.innerHTML = `H:${Math.floor(data.forecast.forecastday[0].day.maxtemp_f)}° L:${Math.floor(data.forecast.forecastday[0].day.mintemp_f)}°`;
    weatherData.append(minMaxTemps);
    //make title before data
    const hourlyTitle = document.createElement("h3");
    hourlyTitle.id = "hourlyTitle";
    hourlyTitle.innerHTML = "Hourly Forecast:";
    weatherData.append(hourlyTitle);
    const hourlyTemps = document.createElement("div");
    hourlyTemps.id = "hourlyTemps";
    //displays hourly data on screen
    function getHourlyData(){
      for (let i=0; i<24; i++){
        let count = i;
        const hourInfo = document.createElement("DIV");
        hourInfo.classList += "hourInfo";
    
        const hourTime = document.createElement("P");
        hourTime.classList += "hourTime";
        hourTime.innerHTML = `${i}AM`;
        if(count==0){
          hourTime.innerHTML = `12AM`;
        }
        if(count==12){
          hourTime.innerHTML = `12PM`;
        }
        if(count>12){
          hourTime.innerHTML = `${i-12}PM`;
        }
        const hourIcon = document.createElement("IMG");
        hourIcon.classList += "hourIcon";
        hourIcon.src = `${data.forecast.forecastday[0].hour[i].condition.icon}`;
        const hourTemp = document.createElement("P");
        hourTemp.classList += "hourTemp";
        hourTemp.innerHTML = `${Math.floor(data.forecast.forecastday[0].hour[i].temp_f)}°`;
    
        hourInfo.append(hourTime);
        hourInfo.append(hourIcon);
        hourInfo.append(hourTemp);
        hourlyTemps.append(hourInfo);
      }
    }
    getHourlyData()

    weatherData.append(hourlyTemps);
 
  } catch (e) {
    console.log(e);
  }
};
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(searchForm.elements.query.value);
  weatherData.innerHTML = "";
  getWeather(searchForm.elements.query.value);
});
