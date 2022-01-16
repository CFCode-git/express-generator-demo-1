const express = require('express');

const router = express.Router();

const usersRouter = require('./users')

const users = []

router.get('/login',(req,res,next)=>{
  const {username}  = req.query
  req.session.user = {username:req.query.username}
  res.send('done')
})

router.get('/hello',(req,res,next)=>{
  const { username } = req.session.user
  res.send(`<h1>hello,${username}</h1>`)
})

router.use('/users',usersRouter)

module.exports = router;
