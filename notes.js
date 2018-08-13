const fs = require("fs");

const notesFile = "notes-data.json";

var fetchNotes = () => {
  var notes = [];

  try {
    var notesString = fs.readFileSync(notesFile);
    notes = JSON.parse(notesString);
  } catch (e) {}

  return notes;
};

var saveNotes = (notes) => {
  fs.writeFile(notesFile, JSON.stringify(notes), {flag: "w"}, () => {
    console.log("note is writen");
  });
};


var addNote = (title, body) => {
  var notes = fetchNotes();
  var newNote = {
    title,
    body
  };

  if (notes.filter((note) => note.title === title).length === 0) {
    notes.push(newNote);
    saveNotes(notes);
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  console.log('Getting note', title);
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var index = null;

  notes.forEach((note, ind) => {
    if (note.title === title) {
      index = ind;
    }
  });

  if (index !== null) {
    notes.splice(index, 1);
    saveNotes(notes);
  }
};


module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
