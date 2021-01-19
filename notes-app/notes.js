const fs = require("fs");
const chalk = require("chalk");
//notes.js is like a toolbox and its functions are like tools
const getNotes = function () {
  return "Your notes...";
};

//addNote is like a drill, title and body are like the bit and the screw
const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function (note) {
    //.filter() returns a readonly array
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"))
  } else {
    console.log(chalk.red.inverse("This is a duplicate"));
  }
};

const removeNote = function (title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title; //This gives a boolean value, True will add it to the new array and False will skip it
  });

  if (notes.length > notesToKeep.length) {
      console.log(chalk.green.inverse("Note removed"));
      saveNotes(notesToKeep);
    } else { // 'chalk.black.bgGreen' is equal to 'chalk.green.inverse'
      console.log(chalk.black.bgRed("Note not found"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return []; //This will create an empty array that will act as a file if none exist
  }
};

//Exports is like a list of tools people can take and access.
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
};
