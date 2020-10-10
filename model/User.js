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
})