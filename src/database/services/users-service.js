const User = require('../schemas/user');
const fetch = require('node-fetch');

const createUser = (userDisplayName, userId) => new User({ userDisplayName, userId }).save();

const findUserByDisplayName = userDisplayName => User.find({ userDisplayName });

const getContactDetails = id => fetch(`${process.env.OKTA_API_PATH}/${id}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `SSWS ${process.env.OKTA_API_TOKEN}`,
  },
});

const getUserLikes = userId => User.findOne({ userId }).then(user => user.userLikedItems);
 
module.exports = {
  createUser,
  findUserByDisplayName,
  getContactDetails,
  getUserLikes,
};
