const googleURL = "https://maps.googleapis.com/maps/api/geocode/json";

console.log("start");

setTimeout(() => {
  console.log("first tomeout");
}, 0);

setTimeout(log, 0, "hi", "Yury");

function log(arg, name) {
  console.log("log", arg, name);
};

console.log("finish");
