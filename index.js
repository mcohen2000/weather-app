console.log("JAVASCRIPT LOADED!!!");
const weatherData = document.querySelector("#weatherData");
const nameDisplay = document.querySelector("#locationName");
const searchForm = document.querySelector("#searchForm");
const options = {
  method: 'GET',
  headers: {

  }
};
const getWeather = async (id) => {
  try {
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=9b9179942dd149a887903158223007&q=${id}&aqi=no`, options);
    const data = await res.json();
    console.log("RESPONSE DATA: ", data);
    nameDisplay.innerHTML = `${data.location.name}, ${data.location.country}`
    if(data.location.region){nameDisplay.innerHTML = `${data.location.name}, ${data.location.region}, ${data.location.country}`};
    const currentWeather = document.createElement("P");
    currentWeather.innerHTML = `It is currently ${await data.current.temp_f} degrees (F) in ${data.location.name}.`;
    weatherData.append(currentWeather);

  } catch (e) {
    console.log(e);
  }
};
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(searchForm.elements.query.value);
  getWeather(searchForm.elements.query.value);
});
