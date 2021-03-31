const router = require('express').Router();
const { createUser } = require('../../database/services/users-service');

router.post('/', async (req, res, next) => {
  if (!req.body.user) {
    const err = new Error('Missing user property');
    err.statusCode = 400;
    return next(err);
  };
  try {
    const newUser = req.body.user;
    await createUser(newUser.userDisplayName);
    // post to okta
  } catch (err) {

  }
  

});