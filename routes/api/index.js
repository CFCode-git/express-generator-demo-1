const express = require('express');

const router = express.Router();

const usersRouter = require('./users')
const JWT = require('jsonwebtoken')

const users = []

router.get('/login',(req,res,next)=>{
  const {username} = req.query
  const user = {username, expireAt:Date.now().valueOf() + (20*60*1000)}
  const token = JWT.sign(user,'adsfaosdfasdfasdf')
  res.send(token)
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
