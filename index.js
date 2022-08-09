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
      `https://api.weatherapi.com/v1/forecast.json?key=9b9179942dd149a887903158223007&q=${id}&days=10&aqi=yes&alerts=no`,
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
    const hourlyTitleIcon = document.createElement("i");
    hourlyTitleIcon.id = "hourlyTitleIcon";
    hourlyTitleIcon.classList += "bi bi-clock";
    hourlyTitle.append(hourlyTitleIcon);
    hourlyTitle.innerHTML += "HOURLY FORECAST";
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
        if (currentTime - 1 < count) {
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
      const missingHours = 24 - hourlyTemps.children.length;
      for (let j = 0; j < missingHours + 1; j++) {
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
        hourTemp.innerHTML = `${Math.floor(
          data.forecast.forecastday[1].hour[j].temp_f
        )}°`;

        hourInfo.append(hourTime);
        hourInfo.append(hourIcon);
        hourInfo.append(hourTemp);
        hourlyTemps.append(hourInfo);
      }
    }
    const daysContainer = document.createElement("DIV");
    daysContainer.id = "daysContainer";
    function get10dayData() {
      const dailyTitle = document.createElement("h3");
      dailyTitle.id = "dailyTitle";
      const dailyTitleIcon = document.createElement("i");
      dailyTitleIcon.classList += "bi bi-calendar3";
      dailyTitleIcon.id = "dailyTitleIcon";
      dailyTitle.append(dailyTitleIcon);
      dailyTitle.innerHTML += "10-DAY FORECAST";
      weatherData.append(dailyTitle);
      for (let i = 0; i < 10; i++) {
        let count = i;
        const dayInfo = document.createElement("DIV");
        dayInfo.classList += "dayInfo";

        const date = document.createElement("P");
        date.classList += "date";
        date.innerHTML = `${data.forecast.forecastday[i].date.slice(-5)}`;
        if (count == 0) {
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
    const aqiContainer = document.createElement("DIV");
    aqiContainer.id = "aqiContainer";
    function getAqiData() {
      const aqiTitle = document.createElement("h3");
      aqiTitle.id = "aqiTitle";
      const aqiTitleIcon = document.createElement("i");
      aqiTitleIcon.classList += "bi bi-lungs";
      aqiTitleIcon.id = "aqiTitleIcon";
      aqiTitle.append(aqiTitleIcon);
      aqiTitle.innerHTML += "AIR QUALITY";
      weatherData.append(aqiTitle);

      const aqiInfo = document.createElement("DIV");
      aqiInfo.id = "aqiInfo";

      const aqiBar = document.createElement("DIV");
      aqiBar.id = "aqiBar";

      const aqiBarMarker = document.createElement("DIV");
      aqiBarMarker.id = "aqiBarMarker";
      aqiBar.append(aqiBarMarker);

      const aqiValue = document.createElement("P");
      aqiValue.classList += "aqiValue";
      const aqiDescription = document.createElement("P");
      aqiDescription.classList += "aqiDescription";
      if (data.current.air_quality["us-epa-index"] === 1) {
        aqiValue.innerHTML = `US EPA Index Level ${data.current.air_quality["us-epa-index"]} - Good`;
        aqiBarMarker.style.marginLeft = "0%";
        aqiBarMarker.style.background = "rgb(0, 228, 0)";
        aqiDescription.innerHTML = `Air quality is satisfactory, and air pollution poses little or no risk.`;
      }
      if (data.current.air_quality["us-epa-index"] === 2) {
        aqiValue.innerHTML = `US EPA Index Level ${data.current.air_quality["us-epa-index"]} - Moderate`;
        aqiBarMarker.style.marginLeft = "13%";
        aqiBarMarker.style.background = "rgb(255, 255, 0)";
        aqiDescription.innerHTML = `Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.`;
      }
      if (data.current.air_quality["us-epa-index"] === 3) {
        aqiValue.innerHTML = `US EPA Index Level ${data.current.air_quality["us-epa-index"]} - Unhealthy for Sensitive Groups`;
        aqiBarMarker.style.marginLeft = "26%";
        aqiBarMarker.style.background = "rgb(255, 126, 0)";
        aqiDescription.innerHTML = `Members of sensitive groups may experience health effects. The general public is less likely to be affected.`;
      }
      if (data.current.air_quality["us-epa-index"] === 4) {
        aqiValue.innerHTML = `US EPA Index Level ${data.current.air_quality["us-epa-index"]} - Unhealthy`;
        aqiBarMarker.style.marginLeft = "39%";
        aqiBarMarker.style.background = "rgb(255, 0, 0)";
        aqiDescription.innerHTML = `Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.`;
      }
      if (data.current.air_quality["us-epa-index"] === 5) {
        aqiValue.innerHTML = `US EPA Index Level ${data.current.air_quality["us-epa-index"]} - Very Unhealthy`;
        aqiBarMarker.style.marginLeft = "52%";
        aqiBarMarker.style.background = "rgb(153, 0, 76)";
        aqiDescription.innerHTML = `Health alert: The risk of health effects is increased for everyone.`;
      }
      if (data.current.air_quality["us-epa-index"] === 6) {
        aqiValue.innerHTML = `US EPA Index Level ${data.current.air_quality["us-epa-index"]} - Hazardous`;
        aqiBarMarker.style.marginLeft = "65%";
        aqiBarMarker.style.background = "rgb(128, 0, 36)";
        aqiDescription.innerHTML = `Health warning of emergency conditions: everyone is more likely to be affected.`;
      }

      aqiInfo.append(aqiBar);
      aqiInfo.append(aqiValue);
      aqiInfo.append(aqiDescription);
      aqiContainer.append(aqiInfo);
    }
    const uvContainer = document.createElement("DIV");
    uvContainer.id = "uvContainer";
    function getUvData() {
      const uvTitle = document.createElement("h3");
      uvTitle.id = "uvTitle";
      const uvTitleIcon = document.createElement("i");
      uvTitleIcon.classList += "bi bi-sun";
      uvTitleIcon.id = "uvTitleIcon";
      uvTitle.append(uvTitleIcon);
      uvTitle.innerHTML += "UV INDEX";
      weatherData.append(uvTitle);

      const uvInfo = document.createElement("DIV");
      uvInfo.id = "uvInfo";

      const uvBar = document.createElement("DIV");
      uvBar.id = "uvBar";

      const uvBarMarker = document.createElement("DIV");
      uvBarMarker.id = "uvBarMarker";
      uvBar.append(uvBarMarker);

      const uvValue = document.createElement("P");
      uvValue.classList += "uvValue";
      const uvDescription = document.createElement("P");
      uvDescription.classList += "uvDescription";
      if (data.current.uv >= 0 && data.current.uv <= 2) {
        uvValue.innerHTML = `Current UV Index: ${data.current.uv} - Low`;
        uvBarMarker.style.marginLeft = "0%";
        uvBarMarker.style.background = "rgb(41, 149, 1)";
        uvDescription.innerHTML = `No protection needed. You can safely stay outside using minimal sun protection.`;
      }
      if (data.current.uv >= 3 && data.current.uv <= 5) {
        uvValue.innerHTML = `Current UV Index: ${data.current.uv} - Moderate`;
        uvBarMarker.style.marginLeft = "15%";
        uvBarMarker.style.background = "rgb(247, 228, 1)";
        uvDescription.innerHTML = `Protection needed. Seek shade during late morning through mid-afternoon. When outside, generously apply broad-spectrum SPF-15 or higher sunscreen on exposed skin, and wear protective clothing, a wide-brimmed hat, and sunglasses.`;
      }
      if (data.current.uv >= 6 && data.current.uv <= 7) {
        uvValue.innerHTML = `Current UV Index: ${data.current.uv} - High`;
        uvBarMarker.style.marginLeft = "30%";
        uvBarMarker.style.background = "rgb(249, 89, 1)";
        uvDescription.innerHTML = `Protection needed. Seek shade during late morning through mid-afternoon. When outside, generously apply broad-spectrum SPF-15 or higher sunscreen on exposed skin, and wear protective clothing, a wide-brimmed hat, and sunglasses.`;
      }
      if (data.current.uv >= 8 && data.current.uv <= 10) {
        uvValue.innerHTML = `Current UV Index: ${data.current.uv} - Very High`;
        uvBarMarker.style.marginLeft = "45%";
        uvBarMarker.style.background = "rgb(217, 0, 17)";
        uvDescription.innerHTML = `Extra protection needed. Be careful outside, especially during late morning through mid-afternoon. If your shadow is shorter than you, seek shade and wear protective clothing, a wide-brimmed hat, and sunglasses, and generously apply a minimum of  SPF-15, broad-spectrum sunscreen on exposed skin.`;
      }
      if (data.current.uv >= 11) {
        uvValue.innerHTML = `Current UV Index: ${data.current.uv} - Extreme`;
        uvBarMarker.style.marginLeft = "60%";
        uvBarMarker.style.background = "rgb(108, 73, 201)";
        uvDescription.innerHTML = `Extra protection needed. Be careful outside, especially during late morning through mid-afternoon. If your shadow is shorter than you, seek shade and wear protective clothing, a wide-brimmed hat, and sunglasses, and generously apply a minimum of  SPF-15, broad-spectrum sunscreen on exposed skin.`;
      }

      uvInfo.append(uvBar);
      uvInfo.append(uvValue);
      uvInfo.append(uvDescription);
      uvContainer.append(uvInfo);
    }
    const windContainer = document.createElement("DIV");
    windContainer.id = "windContainer";
    function getWindData() {
      const windTitle = document.createElement("h3");
      windTitle.id = "windTitle";
      const windTitleIcon = document.createElement("i");
      windTitleIcon.classList += "bi bi-wind";
      windTitleIcon.id = "windTitleIcon";
      windTitle.append(windTitleIcon);
      windTitle.innerHTML += "WIND";
      weatherData.append(windTitle);

      const windInfo = document.createElement("DIV");
      windInfo.id = "windInfo";

      const windChart = document.createElement("DIV");
      windChart.id = "windChart";

      const windChartMarker = document.createElement("DIV");
      windChartMarker.id = "windChartMarker";
      
      const windChartNorth = document.createElement("P");
      windChartNorth.id = "windChartNorth";
      windChartNorth.innerHTML = "N";
      windChart.append(windChartNorth);
      const windChartSouth = document.createElement("P");
      windChartSouth.id = "windChartSouth";
      windChartSouth.innerHTML = "S";
      windChart.append(windChartSouth);
      const windChartEast = document.createElement("P");
      windChartEast.id = "windChartEast";
      windChartEast.innerHTML = "E";
      windChart.append(windChartEast);
      const windChartWest = document.createElement("P");
      windChartWest.id = "windChartWest";
      windChartWest.innerHTML = "W";
      windChart.append(windChartWest);

      const windChartMarkerArrow = document.createElement("DIV");
      windChartMarkerArrow.id = "windChartMarkerArrow";
      windChartMarker.append(windChartMarkerArrow);
      windChart.append(windChartMarker);

      const windValue = document.createElement("P");
      windValue.classList += "windValue";
      windValue.innerHTML = `${data.current.wind_mph} MPH`;

      if (data.current.wind_dir === "N"){
        windChartMarker.style.transform = "rotateZ(0deg)";
      }
      if (data.current.wind_dir === "SSW"){
        windChartMarker.style.transform = "rotateZ(22.5deg)";
      }
      if (data.current.wind_dir === "SW"){
        windChartMarker.style.transform = "rotateZ(45deg)";
      }
      if (data.current.wind_dir === "WNW"){
        windChartMarker.style.transform = "rotateZ(67.5deg)";
      }
      if (data.current.wind_dir === "W"){
        windChartMarker.style.transform = "rotateZ(90deg)";
      }
      if (data.current.wind_dir === "WNW"){
        windChartMarker.style.transform = "rotateZ(112.5deg)";
      }
      if (data.current.wind_dir === "NW"){
        windChartMarker.style.transform = "rotateZ(135deg)";
      }
      if (data.current.wind_dir === "NNW"){
        windChartMarker.style.transform = "rotateZ(157.5deg)";
      }
      if (data.current.wind_dir === "N"){
        windChartMarker.style.transform = "rotateZ(180deg)";
      }
      if (data.current.wind_dir === "NNE"){
        windChartMarker.style.transform = "rotateZ(202.5deg)";
      }
      if (data.current.wind_dir === "NE"){
        windChartMarker.style.transform = "rotateZ(225deg)";
      }
      if (data.current.wind_dir === "ENE"){
        windChartMarker.style.transform = "rotateZ(247.5deg)";
      }
      if (data.current.wind_dir === "E"){
        windChartMarker.style.transform = "rotateZ(270deg)";
      }
      if (data.current.wind_dir === "ESE"){
        windChartMarker.style.transform = "rotateZ(292.5deg)";
      }
      if (data.current.wind_dir === "SE"){
        windChartMarker.style.transform = "rotateZ(315deg)";
      }
      if (data.current.wind_dir === "SSE"){
        windChartMarker.style.transform = "rotateZ(337.5deg)";
      }
      // if (data.current.wind_dir === "N"){
      //   windChartMarker.style.transform = "rotateZ(0deg)";
      // }
      // if (data.current.wind_dir === "NNE"){
      //   windChartMarker.style.transform = "rotateZ(22.5deg)";
      // }
      // if (data.current.wind_dir === "NE"){
      //   windChartMarker.style.transform = "rotateZ(45deg)";
      // }
      // if (data.current.wind_dir === "ENE"){
      //   windChartMarker.style.transform = "rotateZ(67.5deg)";
      // }
      // if (data.current.wind_dir === "E"){
      //   windChartMarker.style.transform = "rotateZ(90deg)";
      // }
      // if (data.current.wind_dir === "ESE"){
      //   windChartMarker.style.transform = "rotateZ(112.5deg)";
      // }
      // if (data.current.wind_dir === "SE"){
      //   windChartMarker.style.transform = "rotateZ(135deg)";
      // }
      // if (data.current.wind_dir === "SSE"){
      //   windChartMarker.style.transform = "rotateZ(157.5deg)";
      // }
      // if (data.current.wind_dir === "S"){
      //   windChartMarker.style.transform = "rotateZ(180deg)";
      // }
      // if (data.current.wind_dir === "SSW"){
      //   windChartMarker.style.transform = "rotateZ(202.5deg)";
      // }
      // if (data.current.wind_dir === "SW"){
      //   windChartMarker.style.transform = "rotateZ(225deg)";
      // }
      // if (data.current.wind_dir === "WSW"){
      //   windChartMarker.style.transform = "rotateZ(247.5deg)";
      // }
      // if (data.current.wind_dir === "W"){
      //   windChartMarker.style.transform = "rotateZ(270deg)";
      // }
      // if (data.current.wind_dir === "WNW"){
      //   windChartMarker.style.transform = "rotateZ(292.5deg)";
      // }
      // if (data.current.wind_dir === "NW"){
      //   windChartMarker.style.transform = "rotateZ(315deg)";
      // }
      // if (data.current.wind_dir === "NNW"){
      //   windChartMarker.style.transform = "rotateZ(337.5deg)";
      // }
      windInfo.append(windChart);
      windInfo.append(windValue);
      windContainer.append(windInfo);
    }
    getHourlyData();
    weatherData.append(hourlyTemps);
    get10dayData();
    weatherData.append(daysContainer);
    getAqiData();
    weatherData.append(aqiContainer);
    getUvData();
    weatherData.append(uvContainer);
    getWindData();
    weatherData.append(windContainer);
  } catch (e) {
    console.log(e);
  }
};
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(searchForm.elements.query.value);
  weatherInfo.innerHTML = "";
  searchSubmitBtn.style.animation =
    "submitAnimation 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
  getWeather(searchForm.elements.query.value);
  setTimeout(() => {
    searchSubmitBtn.style.animation = "";
  }, 2000);
});
