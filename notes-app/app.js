//app.js is like the user of the tools and require tells us what toolboxes they need
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
  handler: function (argv) {
    notes.addNote(argv.title, argv.body)
  }
})

//Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: function() {
    notes.removeNote()
  }
})

//Creat list command
yargs.command({
  command: 'list',
  describe:'list notes',
  handler: function() {
    console.log('Listing the notes')
  }
})

//Create read command
yargs.command({
  command: 'read',
  describe: 'read notes',
  handler: function() {
    console.log('Reading notes')
  }
})

yargs.parse() // This tells yargs to do its thing and parse the code 