
const express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , cookieParser = require('cookie-parser')
  , { User } = require('./models/User')
  , config = require('./config/key')
  , { auth } = require('./middleware/auth')


mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('Db Connected'))
  .catch((err) => console.log(err))

// body-parser extract the entire body portion of an incoming request stream and exposes it on req. body.
//it is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
//to handle http post req, u need the body-parser middleware which is one part of express
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


app.get('/api/user/auth', auth, (req, res) => {
  //send response to client
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastName,
    role: req.user.role
  })
})

app.post('/api/users/register', (req, res) => {
  //we can only do this cuz we enabled body-parser
  const user = new User(req.body)
  //info gotten from the client saved in the db
  user.save((err, doc) => {
    err ? res.json({ success: false, err }) : ''
    return res.status(200).json({ success: true, userData: doc })
  })
})


app.post('/api/user/login', (req, res) => {
  //find email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({ loginSuccess: false, message: 'Authenticated failed, email not found' })

    //compare passwords
    user.comparePasswords(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "You've provided an incorrect password" })
    })
    //generate token
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err)
      res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true })
    })

  })
})



app.get('/api/user/logout', auth, (req, res) => {
  //find specific logged in user
  User.findByIdAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).send({ success: true, message: "You're currently logged out" })
  })
})

const PORT = 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))