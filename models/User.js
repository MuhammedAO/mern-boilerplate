const mongoose = require('mongoose')


// A Mongoose ‘schema’ is a document data structure (or shape of the document) that is enforced via the application layer.
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minLength: 5
  },
  lastName: {
    type: String,
    maxLength: 50
  },
  role: {
    //distinguish between an admin and a normal user
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

const User = mongoose.model('User', userSchema) //name of collection & schema

module.exports = { User }