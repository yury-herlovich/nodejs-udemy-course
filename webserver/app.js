const express = require("express");
const hbs = require("hbs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials/");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public/"))

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