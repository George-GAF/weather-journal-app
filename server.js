// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = new express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 5500;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
}
app.post("/addData", function (req, res) {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.feeling = req.body.feeling;
  res.end();
  console.log(projectData);
});
//GET route that returns the projectData object
app.get("/data", (req, res) => {
  res.send(projectData);
});
