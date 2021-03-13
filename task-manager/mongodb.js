//CRUD  create read update delete Refer to the PDF Guide page 61 and on for a review in CRUD - To start up Mongo database in a new terminal navigate to 'cd ~' and then use '➜  ~ /Users/robp/mongodb/bin/mongod --dbpath=/Users/robp/mongodb-data'.

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID
const { MongoClient, ObjectID } = require("mongodb"); // Destructured shorthand for #3-5

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

//Connecting to Mongo database
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    //--- Updating with Promises instead of callbacks ---
    //This is a VERY common Promise pattern in Node
    // db.collection('users').updateOne({
    //   _id: new ObjectID("603815eeca200a739052d8dd")
    // }, {
    //   $inc: {
    //     age: 5
    //   }
    // }).then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log(error)
    // })

    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: { completed: true },
    //     }
    //   ).then((result) => {
    //     console.log(result);
    //   }).catch((error) => {
    //     console.log(error);
    //   });

    db.collection("tasks").deleteOne({
        description: "Sweep floors"
      }).then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error)
      })
  }
);
