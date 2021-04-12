module.exports = { // here we are mocking the the below functions so our tests can run without sending requests to our sendgrid account, this way we won't be sending countless emails each time our tests run.
  // Our testing will look into the __mocks__ folder for @sendgrid and it will not run sendgrid from our production code.
  setApiKey() {

  },
  send() {

  }
}