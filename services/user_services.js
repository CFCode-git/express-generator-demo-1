// controller 的一部分，用于操作 model
const JWT = require('jsonwebtoken');
const JWTConfig = require('../cipher/jwt_config');

const User = require('../models/mongoose/user');
const Subscription = require('../models/in_memo/subscription');
const HTTPRequestParamError = require('../errors/http_errors/http_request_param_error');
const NoSuchUserError = require('../errors/http_errors/no_such_user_error');

module.exports.getAllUsers = async function () {
  const users = await User.list();
  return users;
};

module.exports.addNewUser = async function (user) {
  if (!user || !user.username || !user.password || !user.name) {
    throw new HTTPRequestParamError(
      'user',
      '用户名或密码不能为空',
      'empty username or password',
    );
  }
  const created = await User.createUserByNamePass(user);

  const token = JWT.sign({
    _id: created._id.toString(),
    expireAt: Date.now().valueOf() + JWTConfig.expireIn,
  }, JWTConfig.SECRET);

  return {
    user: created,
    token,
  };
};

module.exports.loginWithNamePass = (username, password) => {
  if (!username || !password) {
    throw new HTTPRequestParamError(
      'user',
      '用户名或密码不能为空',
      'empty username or password',
    );
  }

  const found = User.getUserByNamePass(username, password);
  if (!found) {
    throw new NoSuchUserError(null, username);
  }

  const token = JWT.sign({
    _id: found._id.toString(),
    expireAt: Date.now().valueOf() + JWTConfig.expireIn,
  }, JWTConfig.SECRET);

  return {
    token,
    user: found,
  };
};

module.exports.getUserById = async (userId) => {
  const user = await User.getOneById(userId);
  return user;
};

module.exports.createSubscription = async (userId, url) => {
  const user = await User.getOneById(userId);
  if (!user) throw Error('No such user!');
  const sub = await Subscription.insert(userId, url);
  return sub;
};
