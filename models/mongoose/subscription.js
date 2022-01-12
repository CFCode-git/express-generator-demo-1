const mongoose = require('mongoose')

const Schema = mongoose.Schema
const {ObjectId} = Schema.types

const SubSchema = new Schema({
  userId: {type: ObjectId, require: true, index: 1},
  url: {type: String, required: true}
})

const SubModel = mongoose.model('Sub', SubSchema)

async function insert(sub) {
  return await SubModel.create(sub)
}

async function list(params) {
  const match = {}
  const flow = SubModel.find(match)
  const subs = await flow.exec()
  return subs
}

async function findByUserId(id) {
  return SubModel.find({id})
}

module.exports = {
  insert,
  findByUserId,
  list
}
