var configPath;

// load a proper .env file
if (process.env.NODE_ENV === 'test') {
  configPath = `${process.cwd()}/test.env`;
} else if (process.env.NODE_ENV === 'development') {
  configPath = `${process.cwd()}/.env`;
}

if (configPath) {
  require('dotenv').config({path: configPath});
}

console.log(process.env.DB_HOST);