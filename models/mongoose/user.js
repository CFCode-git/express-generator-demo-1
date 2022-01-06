const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name:{type:String,require:true,index:1},
  age:{type:Number,min:0,max:120},
  firstName:{type:String,require:true},
  lastName:{type:String,require:true},
})

const UserModel = mongoose.model('user',UserSchema)

async function insert(user){
  return await UserModel.create(user)
}

async function getOneByName(firstName,lastName){
  return UserModel.findOne({firstName,lastName})
}

async function getOneById(id){
  return UserModel.findOne({_id: id})
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
