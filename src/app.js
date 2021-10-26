const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Shpend Mula",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Shpend Mula",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Always wash your hands before dinner! It's COVID time!",
    title: "Help",
    name: "Shpend Mula",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Wather</h1>");
// });

// app.get("/help", (req, res) => {
//   //passing an object or an array gets automatically converted to JSON
//   res.send([
//     {
//       name: "Shpend",
//     },
//     {
//       name: "Liza",
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  const address = req.query.address;
  console.log(address);

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    console.log(latitude, longitude);
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        forecast: forecastData,
        address,
      });
    });
  });
});

app.get("/help/test", (req, res) => {
  res.send("Read all about testing");
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found!",
    name: "Shpend Mula",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "page not found!",
    name: "Shpend Mula",
  });
});

// app.listen(3000, () => {
//   console.log("Server is up and running!");
//   console.log("Yep");
// });

//extending to include also the hbs extension ---> nodemon src/app.js -e .js,.hbs
