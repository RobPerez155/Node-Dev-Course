const fs = require("fs");
const chalk = require("chalk");
const { title } = require("process");
//notes.js is like a toolbox and its functions are like tools

//addNote is like a drill, title and body are like the bit and the screw
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title); //.find searches for the first item it is searching for and then stops
  debugger
  if (!duplicateNote) {
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

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title) // "=>" denotes a return statement and This gives a boolean value, True will add it to the new array and False will skip it


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

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return []; //This will create an empty array that will act as a file if none exist
  }
};

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.yellow("Your notes"))
  notes.forEach((note) => console.log(chalk.green(note.title)))
}

const readNote = (title) => {
  const notes = loadNotes()
  const noteToRead = notes.find((note) => note.title === title)

  if (noteToRead === undefined) {
    console.log(chalk.inverse.red("Look again buckaroo"))
  } else {
    console.log(chalk.inverse.green(noteToRead.title) + " " + (noteToRead.body))
  }
}

//Exports is like a list of tools people can take and access.
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
