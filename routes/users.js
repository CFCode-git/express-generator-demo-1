// this is controller
const express = require('express');

const router = express.Router();
// const User = require('../models/in_memo/user');
const UserService = require('../services/user_services');
/* GET users listing. */
router.get('/', (req, res) => {
  (async() => {
    res.locals.users = await UserService.getAllUsers();
    res.render('users');
  })()
    .then(r=>{
      console.log(r)
    })
    .catch(e=>{
      console.log(e)
    })
});
/* POST users listing. */
router.post('/', (req, res) => {
  const {firstName, lastName, age} = req.body;
  const user = UserService.addNewUser(firstName, lastName, age);
  res.json(user);
});

router.get('/:userId', (req, res) => {
  console.log(req.params.userId);
  const user = UserService.getUserById(Number(req.params.userId));
  res.locals.user = user;
  res.render('user');
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
