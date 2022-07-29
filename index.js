console.log("JAVASCRIPT LOADED!!!");
const weatherData = document.querySelector("#weatherData");
const nameDisplay = document.querySelector("#locationName");
const submitButton = document.querySelector("#submitButton");
const getWeather = async (id) => {
  try {
    const res = await fetch(``);
    const data = await res.json();
    console.log("RESPONSE DATA: ", data);

  } catch (e) {
    console.log(e);
  }
};
submitButton.addEventListener("click", function () {
  getWeather();
});
