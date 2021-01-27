// // A callback function is a function whose argument is another function that we intend to call in the future.

// //setTimeout(() => {FunctionToRun}, TimeInMilliseconds)

// setTimeout(() => {
//   //This is an Asynchronous callback function - Has to be passed to node to v8 engine
//   console.log("Two seconds are up");
// }, 2000);

// const names = ["Andrew", "Jen", "Jess"];
// const shortNames = names.filter((name) => {
//   //This is a Synchronous callback function, where .filter will be called back multiple times for each item in the array
//   return name.length <= 4;
// });

// const funktion = () => {}; // As this stands this function is designed to take another callback function

// const geocode = (address, callback) => { 
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       longitude: 0,
//     };
//     callback(data);
//   }),
//     1000;
// };

// geocode("Philadelphia", (data) => {
//   console.log(data);
// });

// Below we are only defining our function
const add = (x, y, callback) => {
  setTimeout(() => {
   callback(x+y) // Callback here functions similarly to the "return" keyword.
  },2000
)}
// Here we are running it
add(1, 4, (pizza) => { //pizza can be any word here, because the callback function was already defined on #36
  console.log(pizza)
})// The Timeout function will run first, then after 5 seconds the callback function will be run.