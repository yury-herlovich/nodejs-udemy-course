const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials/");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public/"))

// log
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} - ${req.url}`;

  console.log(log);
  fs.appendFile('app.log', log + "\n", (err) => {});

  next()
});


hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
})

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
})

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/test", (req, res) => {
  res.render("test.hbs", {
    pageTitle: "Test page"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});