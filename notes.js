const fs = require("fs");

const notesFile = "notes.json";
const origNote = {
  title: 'Some Note',
  body: 'Some Body'
};

var addNote = (title, body) => {
  console.log('Adding note', title, body);

  var notes = getAll();

  notes.push({title, body});

  writeToFile(notes);
};

var getAll = () => {
  var notesString = fs.readFileSync(notesFile);

  try {
    var notes = JSON.parse(notesString);
  } catch (e) {
    notes = [];
  }

  return notes ? notes : [];
};

var getNote = (title) => {
  console.log('Getting note', title);
};

var removeNote = (title) => {
  console.log('Removing note', title);
};

var writeToFile = (notes) => {
  var notesString = JSON.stringify(notes);

  fs.writeFile(notesFile, notesString, {flag: "w"}, () => {
    console.log("note is writen");
  });
};



module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
