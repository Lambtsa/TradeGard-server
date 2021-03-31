const router = require('express').Router();
const { createUser } = require('../../database/services/users-service');
const fetch = require('node-fetch');

router.post('/', async (req, res, next) => {
  if (!req.body.user) {
    const err = new Error('Missing user property');
    err.statusCode = 400;
    return next(err);
  };
  try {
    const newUser = req.body.user;
    /*
    1. Search for user first to see if display name is already used
    2. Then create okta user
    3. then create DB user if okta is good
    */
    await createUser(newUser.userDisplayName);
    const oktaUser = {
      profile: {
        firstName: newUser.userFirstName,
        lastName: newUser.userLastName,
        email: newUser.userEmail,
        login: newUser.userEmail,
        mobilePhone: newUser.userTelephone,
        nickName: newUser.userDisplayName,
      },
      groupIds: [
        process.env.OKTA_GROUP_ID,
      ],
      credentials: {
        password: {
          value: newUser.userPassword,
        }
      }
    }
    // post to okta
    const response = await fetch(process.env.OKTA_API_PATH, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json',
        Authorization: `SSWS ${process.env.OKTA_API_TOKEN}`
      },
      body: JSON.stringify(oktaUser),
    });
    const data = await response.json();
    console.log(data);
    res
      .status(201)
      .send('resource created');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
