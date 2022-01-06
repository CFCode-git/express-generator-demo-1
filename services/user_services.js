// controller 的一部分，用于操作 model
const User = require('../models/mongoose/user');
const Subscription = require('../models/in_memo/subscription');

// eslint-disable-next-line func-names
module.exports.getAllUsers = async function () {
  return await User.list()
};
// eslint-disable-next-line func-names
module.exports.addNewUser = async function (name,age) {
  return await User.insert({
    name, age
  });
};

module.exports.getUserById = async (userId) => {
  return await User.getOneById(userId);
};
module.exports.createSubscription = async (userId, url) => {
  const user = await User.getOneById(userId);
  if (!user) throw Error('No such user!');
  const sub = await Subscription.insert(userId, url);
  return sub;
};
