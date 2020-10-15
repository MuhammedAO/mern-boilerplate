const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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


const saltRounds = 10

//before saving the user, carry out this op
userSchema.pre('save', (next) => {
  let user = this

  //this process needs to happen only when we modify the password(last step)
  if (user.isModified('password')) {

    bcrypt.genSalt(saltRounds, (err, salt) => {
      //nexe() => don't do anything, just save
      if (err) return next(err)

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err)
        user.password = hash
      })

    })
  } else {
    next()
  }
})

const User = mongoose.model('User', userSchema) //name of collection & schema

module.exports = { User }