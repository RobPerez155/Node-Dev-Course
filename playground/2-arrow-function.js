const square = function (x) { // Standard Function 
  return x * x
}

const square = (x) => { // Arrow Function -> This can be further condensed as seen below
  return x * x
}

const square = (x) => x * x // Same as the above functions, useful if our function is simple and only has a single statement and return

console.log(square(4096))

const event = {
  name: 'Birthday Party',
  printGuestList: function () {
    console.log('Guest list for ' + this.name) // Arrow functions can't take advantage of the .this feature
  }
}

const event = {
  name: 'Birthday Party',
  guestList: ["Andrew", "Jen", "Mike"],
  printGuestList() { // Shorthand for the above function
    console.log('Guest list for ' + this.name) // Arrow functions can't take advantage of the .this feature

    this.guestList.forEach(function(guest){ // Using a function here will yield undefined for the this.name, because (function() binds 'this.' to what's inside 
      console.log(guest + ' is attending ' + this.name)
    })

    this.guestList.forEach((guest) => { // Using an arrow function here allows the 'this.' to be used within a function because it doesn't bind the 'this.' value
      console.log(guest + ' is attending ' + this.name)
    })
  }
}

// function() is best for making methods and arrow functions are great for everything else

event.printGuestList()