// this is controller
const express = require('express');

const router = express.Router();
// const User = require('../models/in_memo/user');
const UserService = require('../services/user_services');
const HTTPRequestParamError = require('../errors/http_request_param_error')


/* GET users listing. */
router.get('/', (req, res,next) => {
  (async() => {
    // throw new HTTPRequestParamError('page','请指定页码','page can not be empty')
    res.locals.users = await UserService.getAllUsers();
  })()
    .then(r=>{
      res.render('users');
    })
    .catch(e=>{
      next(e)
    })
});
/* POST users listing. */
router.post('/', (req, res) => {
  const {firstName, lastName, age} = req.body;
  const user = UserService.addNewUser(firstName, lastName, age);
  res.json(user);
});

router.get('/:userId', (req, res) => {
  (async()=>{
    const {userId} = req.params
    if(userId.length<5)throw new HTTPRequestParamError(
      'userId','用户id不能为空','user id can not be empty'
    )
    const user = await UserService.getUserById(Number(req.params.userId));
    res.locals.user = user;
  })()
    .then(r=>{
      res.render('user');
    })
    .catch(e=>{
      console.log(e)
      res.json(e)
    })
});

router.post('/:userId/subscription', (req, res, next) => {
  try {
    const sub = UserService.createSubscription(Number(req.params.userId), req.body.url);
    res.json(sub);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
