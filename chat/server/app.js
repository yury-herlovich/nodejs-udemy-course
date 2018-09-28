require('./config/config');
const express = require('express');
const path = require('path');

var app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.listen(process.env.PORT, () => {
  console.log(`Started up at port ${process.env.PORT}.`);
});

module.exports = {
  app
};