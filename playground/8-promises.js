// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve([1, 4, 7])
//     reject('Things went wrong!')
//   }, 2000)
// })

// doWorkPromise.then((result) => {
//   console.log('Success', result)
// }).catch((reject) => {
//   console.log('Error', error)
// })

//
//                                fulfilled 
//                              /
//  Promise      -- pending -->
//                              \
//                                rejected
// 
//When the code above executes, I can say...
//I have a PROMISE, called doWorkPromise, it's PENDING for 2 seconds, and then it's REJECTED

const add = (a, b) => {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}

//The downside to chaining promises like this is that it creates complicated nesting
add(1, 2).then((sum) => {
  console.log(sum)

  add(sum, 5).then((sum2) => {
    console.log(sum2)
  }).catch((e) => {
    console.log(e)
  })
}).catch((e) => {
  console.log(e)
})

// Promise chaining done right
add(1, 1).then((sum) => {
  console.log(sum)
  return add(sum, 4)
}).then((sum2) => {
  console.log(sum2)
}).catch((e) => {
  console.log((e) => {
    console.log(e)
  })
})