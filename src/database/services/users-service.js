const User = require('../schemas/user');

const createUser = userDisplayName => new User({ userDisplayName }).save();

module.exports = { createUser };
