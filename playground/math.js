// const tip = (bill, percent) => {
//   return bill * (1 + (percent/100))
// } 

// tip(90,20)

// const calculateTip = (total, tipPercent) => {
//   const tip = total * tipPercent
//   return total + tip
// }

// ES6 Shorthand of above
const calculateTip = (total, tipPercent = .2) => total + (total * tipPercent)

const fahrenheitToCelsius = (temp) => {
  return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
  return (temp * 1.8) + 32
}

const add = (a, b) => {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('Numbers must be non-negative')
      }

      resolve(a + b)
    }, 2000)
  })
}

module.exports = {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add
}