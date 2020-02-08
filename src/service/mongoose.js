const mongoose = require('mongoose')

module.exports = mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0-gmth0.mongodb.net/upload_example?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('mongo connect')
  })
  .catch(err => {
    console.log('fail mongo connect: ' + err)
  })
