const db = require('./db');

var handleSignp = (email, password) => {
  // Check if email already exists
  db.saveUser({email, password});

  // Save the user to the db
  // Send the welcome email
};

module.exports = {
  handleSignp
};