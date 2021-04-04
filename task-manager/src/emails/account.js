const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'robert.perez.psirho@gmail.com',
    subject: 'Welcome email!',
    text: `Did ${name} get my email?`
  })
}

const comeBackEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'robert.perez.psirho@gmail.com',
    subject: 'Come BACK!!!!',
    text: `Hey ${name}, whatsa matter with yous? You don'ts like my Nona's spaghetti? Well then I hope yous like seafood, cuz you're gonna be sleeping with the fishes if you's don't comeback and eat a meatball or somethin'`
  })
}

  module.exports = {
    sendWelcomeEmail, 
    comeBackEmail
  }