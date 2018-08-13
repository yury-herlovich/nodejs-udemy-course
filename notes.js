const fs = require("fs");

const notesFile = "notes-data.json";
const origNote = {
  title: 'Some Note',
  body: 'Some Body'
};

var addNote = (title, body) => {
  var notes = getAll();
  var newNote = {
    title,
    body
  };

  if (notes.filter((note) => note.title === title).length === 0) {
    notes.push(newNote);
  }

  writeToFile(notes);
};

var getAll = () => {
  var notes = [];

  try {
    var notesString = fs.readFileSync(notesFile);
    notes = JSON.parse(notesString);
  } catch (e) {}

  return notes;
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
