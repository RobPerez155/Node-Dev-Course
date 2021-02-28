//CRUD  create read update delete

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

    db.collection("users").findOne({ name: "Kat" }, (error, user) => {
      //findOne takes 2 arguments, first the object we're looking for and second the function we want to do with it
      if (error) {
        return console.log("Unable to fetch");
      }

      console.log(user.name);
    });

    db.collection("users")
      .find({ age: 32 })
      .toArray((error, users) => {
        console.log(users);
      });

    db.collection("users")
      .find({ age: 32 })
      .count((error, count) => console.log(count));

    db.collection("tasks").findOne(
      { _id: new ObjectID("60381b756cd76874ecb445c4") },
      (error, task) => {
        console.log(task);
      });

    db.collection('tasks').find({ completed: false}).toArray((error, tasks) => {
      console.log(tasks)
    })
  }
);


