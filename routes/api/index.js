const express = require('express');

const router = express.Router();

const usersRouter = require('./users')
const JWT = require('jsonwebtoken')

const User = require('../../models/mongoose/user')

const crypto = require('crypto')
const async = require('async')

const pbkdf2Async = require('bluebird').promisify(crypto.pbkdf2) // promisify 的作用:把 nodejs 经典的 callback 类型写成 promise

router.post('/login',(req,res,next)=>{
  (async()=>{
    const {username,password} = req.body;
    const cipher = await pbkdf2Async(password,'adfasdfasdohlhlf',10000,512,'sha256')
    const create = await User.insert({username,password:cipher})
  })().then(r=>{

  }).catch(e=>{

  })
})

router.get('/hello',(req,res,next)=>{
  const auth = req.get('Authorization')
  if(!auth) return res.send('no auth')
  if(auth.indexOf('Bearer ') ===  -1) return res.send('no auth')
  const token = auth.split('Bearer ')[1]
  const user = JWT.verify(token,'adsfaosdfasdfasdf')
  if(user.expireAt < Date.now().valueOf())res.send('token 失效')
  res.send(user)
})

router.use('/users',usersRouter)

module.exports = router;
