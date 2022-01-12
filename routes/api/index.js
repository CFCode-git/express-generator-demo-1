const express = require('express');

const router = express.Router();

const usersRouter = require('./users')

const users = []

router.get('/login',(req,res,next)=>{
  const {username} = req.query
  req.session.user = {username}
  res.send()
})

router.get('/hello',(req,res,next)=>{
  const {username} = req.session
  res.send(`<h1>hello,${req.cookies.username}</h1>`)
})

router.use('/users',usersRouter)

module.exports = router;
