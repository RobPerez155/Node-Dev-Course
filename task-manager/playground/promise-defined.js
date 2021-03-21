// Think of a Promise like a ridesharing app

// Creating a Promise
const ride = new Promise((resolve, reject) => {
  if (arrived) {
    resolve('driver arrived')
  } else {
    reject('driver bailed')
  }
})

// Consuming a Promise
ride
    .then(value => {
      console.log(value);
      // driver arrived
    })
    .catch(error => {
      console.log(error);
      // driver bailed
    })