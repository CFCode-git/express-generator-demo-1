const express = require('express');

const router = express.Router();

const usersRouter = require('./users');

const UserService = require('../../services/mongodb_connection');

const apiRes = require('../../utils/api_response');

router.get('/login', (req, res) => {
  (async () => {
    const { username, password } = req.body;
    const result = await UserService.loginWithNamePass(username, password);
    return result;
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      res.err = e;
      apiRes(req, res);
    });
});

router.use('/users', usersRouter);

module.exports = router;
