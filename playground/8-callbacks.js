const doWorkCallback = (callback) => {
  setTimeout(() => {
    //Writing 'undefined' as the second argument on #4 is optional, it will be assumed undefined if left out.
    //callback('This is an error', undefined)
    callback(undefined, [1, 4, 7])
  }, 2000)
}

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error)
  }

  console.log(result)
}) 

