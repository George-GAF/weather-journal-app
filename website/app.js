/* Global Variables */
// api.openweathermap.org/data/2.5/weather?zip=11311&appid=e00d4efeadcf3512ba3a48c224fce56a
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=e00d4efeadcf3512ba3a48c224fce56a";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

// listener function
function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;

  getData(baseURL + zipCode + apiKey)
    .then((data) => {
      postData("http://localhost:5500/addData", {
        temp: data.main.temp,
        date: newDate,
        feeling: feeling,
      });
    })
    .then(() => {
      updateUI();
    });
}
// get data
const getData = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

async function updateUI() {
  const req = await fetch("http://localhost:5500/data");
  try {
    const data = await req.json();
    console.log(data);
    document.getElementById("date").innerHTML = "Date : " + data.date;
    document.getElementById("temp").innerHTML = "Temperature : " + data.temp;
    document.getElementById("content").innerHTML =
      "User Feeling : " + data.feeling;
  } catch (error) {
    console.log("error", error);
  }
}
