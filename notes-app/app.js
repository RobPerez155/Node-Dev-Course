//app.js is like the user of the tools and require tells us what toolboxes they need
const { demandOption, string } = require('yargs')
const yargs = require('yargs') // This is an npm package
const notes = require('./notes.js') // This is our file

// Customize yargs version
yargs.version('1.1.0')
//Create yargs add command
yargs.command({  //Initializes a new command
  command: 'add', //Command's name
  describe: 'Add a new note', //Describes what the command does
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, // Requires user input
      type: 'string' // Specify the value we want back, this will default to a boolean value  
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  }, //This is an object that will describe all the options a given command will support
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  }
})

//Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Title of note to be removed',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
})

//Creat list command
yargs.command({
  command: 'list',
  describe:'list notes',
  handler(argv) {
    notes.listNotes(argv.title)
  }
})

//Create read command
yargs.command({
  command: 'read',
  describe: 'read notes',
  builder: {
    title: {
      describe: 'Title of note to be read',
      demandOption: true,
      type: string
    }
  },
  handler(argv) {
    notes.readNote(argv.title)
  }
})

yargs.parse() // This tells yargs to do its thing and parse the code 