// const math = require('../src/math') // This imports the whole file
const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math') // This destructures the file to pull in only the functions we need

// This is the basic way to write a test
// test('should calculate total with tip', () => {
//   const total = calculateTip(10,.3)

//   if (total !== 13) {
//     throw new Error(`Total with tip should be 13, not ${total}`)
//   }
// })

test('should calculate total with tip', () => {
  const total = calculateTip(10,.3)
  expect(total).toBe(13)
})

test('should calculate total with default tip', () => {
  const total = calculateTip(10)
  expect(total).toBe(12)
})

test('should convert 32F to 0C', () => {
  const freezingC = fahrenheitToCelsius(32)
  expect(freezingC).toBe(0)
})

test('should convert 0C to 32F', () => {
  expect(celsiusToFahrenheit(0)).toBe(32)
})

// This test will not throw an error because Jest does not know this test has asynchronous code
// test('Async test demo', () => {
//   setTimeout(() => {
//     expect(1).toBe(2)
//   }, 2000)
// })

// This test will throw an error because Jest sees our parameter of done() and it won't consider this test a success or a failure until done() is called. done() can be called anything
// test('Async test demo', (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2)
//     done()
//   }, 2000)
// })

// Both methods of using done() and async/await are valid, but async/await are most common

test('should add two numbers', (done) => {
  add(2, 3).then((sum) => { //here we call .then() allowing us to provide a function to run when the promise has been fulfilled by a value, in this case the sum 
    expect(sum).toBe(5)
    done()
  })
})

test('should add two numbers async/await', async () => {
  const sum = await add(10, 22)
  expect(sum).toBe(32)
})
