const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '') // header return the string token's value, and replace to remove the beginning portion
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // this will validate the header and find the associated user
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token}) // what this will do is find a user with the correct ID who has that Authentication ID still stored.

    if (!user) {
      throw new Error()
    }

    req.token = token // This will give our routers access to this specific token
    req.user = user // we are going to give the route(user.js and task.js) handler access to the user that we fetched from the database
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please Authenticate'})
  }
}

module.exports = auth