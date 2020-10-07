const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mo:xxxx@cluster0.q9rcm.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Db Connected'))
  .catch((err) => console.log(err))

// const mongooseUrl = 'mongodb+srv://mo:xxxx@cluster0.q9rcm.mongodb.net/<dbname>?retryWrites=true&w=majority'

// const dbConnect = async () => {
//   try {
//     const endPoint = await mongoose.connect(mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//     return endPoint ? console.log('Db connect') : ''
//   }
//   catch (error) {
//     console.log(error)
//   }
// }

// dbConnect()


app.get('', (req, res) => {
  res.send('Hello World')
})


const PORT = 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))