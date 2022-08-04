console.log("JAVASCRIPT LOADED!!!");
const weatherInfo = document.querySelector("#weatherInfo");
const searchForm = document.querySelector("#searchForm");
const searchSubmitBtn = document.querySelector("#submitButton");
const options = {
  method: "GET",
  headers: {},
};

const getWeather = async (id) => {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9b9179942dd149a887903158223007&q=${id}&days=10&aqi=no&alerts=no`,
      options
      );
      const data = await res.json();
      console.log("RESPONSE DATA: ", data);
      const nameDisplay = document.createElement("H2");
      nameDisplay.id = "locationName";
      weatherInfo.append(nameDisplay);
      const weatherData = document.createElement("DIV");
      weatherData.id = "weatherData";
      weatherInfo.append(weatherData);
    if (data) {
      weatherData.style.display = "flex";
    }
    nameDisplay.innerHTML = `${data.location.name}, ${data.location.country}`;
    if (data.location.region) {
      nameDisplay.innerHTML = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
    }
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
    minMaxTemps.innerHTML = `H:${Math.floor(
      data.forecast.forecastday[0].day.maxtemp_f
    )}° L:${Math.floor(data.forecast.forecastday[0].day.mintemp_f)}°`;
    weatherData.append(minMaxTemps);
    //make title before data
    const hourlyTitle = document.createElement("h3");
    hourlyTitle.id = "hourlyTitle";
    hourlyTitle.innerHTML = "HOURLY FORECAST";
    weatherData.append(hourlyTitle);
    const hourlyTemps = document.createElement("div");
    hourlyTemps.id = "hourlyTemps";
    //displays hourly data on screen
    function getHourlyData() {
      for (let i = 0; i < 24; i++) {
        let count = i;
        const currentTime = parseInt(data.location.localtime.slice(-5, -3));
        console.log(count);
        console.log("Time:", currentTime);
        console.log("Count:", count);
        //if time is before the current hour dont show data
        if (currentTime-1 < count){
        console.log(`KEEP #hour${i}`);

        const hourInfo = document.createElement("DIV");
        hourInfo.classList += "hourInfo";
        hourInfo.id = `hour${i}`;
        
        const hourTime = document.createElement("P");
        hourTime.classList += "hourTime";
        hourTime.innerHTML = `${i}AM`;
        if (count == 0) {
          hourTime.innerHTML = `12AM`;
        }
        if (count == 12) {
          hourTime.innerHTML = `12PM`;
        }
        if (count > 12) {
          hourTime.innerHTML = `${i - 12}PM`;
        }
        if (currentTime == count) {
          hourTime.innerHTML = `Now`;
        }
        const hourIcon = document.createElement("IMG");
        hourIcon.classList += "hourIcon";
        hourIcon.src = `${data.forecast.forecastday[0].hour[i].condition.icon}`;
        const hourTemp = document.createElement("P");
        hourTemp.classList += "hourTemp";
        hourTemp.innerHTML = `${Math.floor(
          data.forecast.forecastday[0].hour[i].temp_f
        )}°`;

        hourInfo.append(hourTime);
        hourInfo.append(hourIcon);
        hourInfo.append(hourTemp);
        hourlyTemps.append(hourInfo);

        }
        
      }
      const missingHours = 24-hourlyTemps.children.length;
        for (let j = 0; j < missingHours+1; j++) {
          let nextDayCount = j;

          const hourInfo = document.createElement("DIV");
          hourInfo.classList += "hourInfo";
          hourInfo.id = `hour${j}`;
        
          const hourTime = document.createElement("P");
          hourTime.classList += "hourTime";
          hourTime.innerHTML = `${j}AM`;
          if (nextDayCount == 0) {
            hourTime.innerHTML = `12AM`;
          }
          if (nextDayCount == 12) {
            hourTime.innerHTML = `12PM`;
          }
          if (nextDayCount > 12) {
            hourTime.innerHTML = `${j - 12}PM`;
          }

          const hourIcon = document.createElement("IMG");
          hourIcon.classList += "hourIcon";
          hourIcon.src = `${data.forecast.forecastday[1].hour[j].condition.icon}`;
          const hourTemp = document.createElement("P");
          hourTemp.classList += "hourTemp";
          hourTemp.innerHTML = `${Math.floor(data.forecast.forecastday[1].hour[j].temp_f)}°`;

          hourInfo.append(hourTime);
          hourInfo.append(hourIcon);
          hourInfo.append(hourTemp);
          hourlyTemps.append(hourInfo);
        }
    }
    getHourlyData();
    const daysContainer = document.createElement("DIV");
    daysContainer.id = "daysContainer";
    function get10dayData() {
      const dailyTitle = document.createElement("h3");
      dailyTitle.id = "dailyTitle";
      dailyTitle.innerHTML = "10-DAY FORECAST";
      weatherData.append(dailyTitle);
      for (let i = 0; i < 10; i++) {
        let count = i;
        const dayInfo = document.createElement("DIV");
        dayInfo.classList += "dayInfo";

        const date = document.createElement("P");
        date.classList += "date";
        date.innerHTML = `${data.forecast.forecastday[i].date.slice(-5)}`;
        if(count == 0){
          date.innerHTML = `Today`;
        }
        const dayIcon = document.createElement("IMG");
        dayIcon.classList += "dayIcon";
        dayIcon.src = `${data.forecast.forecastday[i].day.condition.icon}`;
        const dayMinTemp = document.createElement("P");
        dayMinTemp.classList += "dayMinTemp";
        dayMinTemp.innerHTML = `${Math.floor(
          data.forecast.forecastday[i].day.mintemp_f
        )}°`;
        const dayMaxTemp = document.createElement("P");
        dayMaxTemp.classList += "dayMaxTemp";
        dayMaxTemp.innerHTML = `${Math.floor(
          data.forecast.forecastday[i].day.maxtemp_f
        )}°`;
        const dayMinMaxContainer = document.createElement("DIV");
        dayMinMaxContainer.classList += "dayMinMaxContainer";
        const minMaxBar = document.createElement("div");
        minMaxBar.classList += "minMaxBar";

        dayMinMaxContainer.append(dayMinTemp);
        dayMinMaxContainer.append(minMaxBar);
        dayMinMaxContainer.append(dayMaxTemp);

        dayInfo.append(date);
        dayInfo.append(dayIcon);
        dayInfo.append(dayMinMaxContainer);
        daysContainer.append(dayInfo);
      }
    }
    weatherData.append(hourlyTemps);
    get10dayData();
    weatherData.append(daysContainer);
  } catch (e) {
    console.log(e);
  }
};
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(searchForm.elements.query.value);
  weatherInfo.innerHTML = "";
  searchSubmitBtn.style.animation = "submitAnimation 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
  getWeather(searchForm.elements.query.value);
  setTimeout(() => {searchSubmitBtn.style.animation = "";}, 2000);
  
});
