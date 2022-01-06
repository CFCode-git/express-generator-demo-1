const mongoose = require('mongoose')
mongoose.Promise = Promise
const uri = `mongodb://localhost:27017/mongodemo`
mongoose.connect(uri)
const db = mongoose.connection

db.on('open', () => {
  console.log('db connected!')
})

db.on('error', (e) => {
  console.log(e)
})

module.exports = db
