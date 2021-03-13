const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([1, 4, 7])
    reject('Things went wrong!')
  }, 2000)
})

doWorkPromise.then((result) => {
  console.log('Success', result)
}).catch((reject) => {
  console.log('Error', error)
})

//
//                                fulfilled 
//                              /
//  Promise      -- pending -->
//                              \
//                                rejected
// 
//When the code above executes, I can say...
//I have a PROMISE, called doWorkPromise, it's PENDING for 2 seconds, and then it's REJECTED