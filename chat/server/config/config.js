const path = require('path');

var configPath;

// load a proper .env file
if (process.env.NODE_ENV === 'test') {
  configPath = path.resolve(process.cwd(), '.env.test');
} else if (process.env.NODE_ENV === 'development') {
  configPath = path.resolve(process.cwd(), '.env');
}

if (configPath) {
  require('dotenv').config({path: configPath});
}