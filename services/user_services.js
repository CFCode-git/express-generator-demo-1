// controller 的一部分，用于操作 model
const User = require('../models/in_memo/user');
const Subscription = require('../models/in_memo/subscription');

// eslint-disable-next-line func-names
module.exports.getAllUsers = function () {
  return User.list();
};
// eslint-disable-next-line func-names
module.exports.addNewUser = function (firstName, lastName, age) {
  return User.insert(firstName, lastName, age);
};

module.exports.getUserById = (userId) => {
  return User.getOneById(userId);
};
module.exports.createSubscription = (userId, url) => {
  const user = User.getOneById(userId);
  if (!user) throw Error('No such user!');
  const sub = Subscription.insert(userId, url);
  return sub;
};
