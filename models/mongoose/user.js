const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name:{type:String,require:true,index:1},
  age:{type:Number,min:0,max:120},
})

const UserModel = mongoose.model('user',UserSchema)

async function insert(user){
  return await UserModel.create(user)
}

async function getOneById(id){
  return UserModel.findOne({_id: id})
}

async function getOneByName(name){
  return UserModel.findOne({name})
}

async function list(params){
  const match = {}
  const flow = UserModel.find(match)
  const users = await flow.exec()
  return users
}

module.exports = {
  insert,
  getOneByName,
  getOneById,
  list
}
