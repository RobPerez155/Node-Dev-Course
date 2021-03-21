const add = (a, b) => {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}

const doWork = async () => { // async functions always return a promise
  const sum = await add(1, 99)
  const sum2 = await add(sum, 50)
  const sum3 = await add(sum2, 3)
  return sum3
  // throw new Error('Somethings wrong Jim') - If there is an error the whole method will fail
}

doWork().then((result) => {
  console.log('result', result)
}).catch((e) => {
  console.log('e', e)
})