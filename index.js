const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User')
const config = require('./config/key')


mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('Db Connected'))
  .catch((err) => console.log(err))

// body-parser extract the entire body portion of an incoming request stream and exposes it on req. body.
//it is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
//to handle http post req, u need the body-parser middleware which is one part of express
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.post('/api/users/register', (req, res) => {
  //we can only do this cuz we enabled body-parser
  const user = new User(req.body)
  //info gotten from the client saved in the db
  user.save((err, userData) => {
    err ? res.json({ success: false, err }) : ''
  })
  return res.status(200).json({ success: true })
})

const PORT = 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))