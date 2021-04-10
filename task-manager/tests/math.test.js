// const math = require('../src/math') // This imports the whole file
const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, bigButts } = require('../src/math') // This destructures the file to pull in only the functions we need

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


