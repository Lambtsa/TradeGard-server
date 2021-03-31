const User = require('../schemas/user');

const createUser = (userDisplayName, userId) => new User({ userDisplayName, userId }).save();

const findUserByDisplayName = userDisplayName => User.find({ userDisplayName });


module.exports = {
  createUser,
  findUserByDisplayName,
};
