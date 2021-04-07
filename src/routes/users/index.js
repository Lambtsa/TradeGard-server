const router = require('express').Router();
const fetch = require('node-fetch');
const { createUser, findUserByDisplayName, getUserLikes } = require('../../database/services/users-service');
const { getItemById } = require('../../database/services/items-service');
const { authenticationRequired } = require('../../authentication/authentication-service');

router.get('/:id/likes', authenticationRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userLikes = await getUserLikes(id);
    const items = await Promise.all(userLikes.map(getItemById));
    res.json({
      items,
      userLikedItems: userLikes,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  if (!req.body.user) {
    const err = new Error('Missing user property');
    err.statusCode = 400;
    return next(err);
  }
  try {
    const newUser = req.body.user;
    const userMatch = await findUserByDisplayName(newUser.userDisplayName);
    if (userMatch.length !== 0) {
      const err = new Error('Display name already exists!');
      err.statusCode = 400;
      return next(err);
    }
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
        },
      },
    };
    const response = await fetch(process.env.OKTA_API_PATH, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `SSWS ${process.env.OKTA_API_TOKEN}`,
      },
      body: JSON.stringify(oktaUser),
    });
    if (!response.ok) {
      const badResponse = await response.json();
      const err = new Error(badResponse.errorCauses[0].errorSummary);
      err.statusCode = 400;
      return next(err);
    }
    const data = await response.json();
    await createUser(newUser.userDisplayName, data.id);
    /*
      Should we return the user created here?
    */
    return res
      .status(201)
      .send('resource created');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
