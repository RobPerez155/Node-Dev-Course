const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
  to: 'robert.perez.psirho@gmail.com',
  from: 'robert.perez.psirho@gmail.com',
  subject: 'Here is me first email!',
  text: 'Did I get my email?'
})