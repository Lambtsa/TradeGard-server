const router = require('express').Router();
const { authenticationRequired } = require('../../authentication/authentication-service');
const { getUserLikes, getContactDetails } = require('../../database/services/users-service');
const { getItemById, getItemsByUserId } = require('../../database/services/items-service');

router.get('/', authenticationRequired, async (req, res, next) => {
  const { uid } = req.jwt.claims;
  try {
    const authenticatedUserlikes = await getUserLikes(uid);
    const likedItemsOwners = await Promise.all(authenticatedUserlikes.map(async like => {
      const likedItemObject = await getItemById(like);
      return likedItemObject.itemOwner;
    }));

    const authenticatedUserItems = await getItemsByUserId(uid);
    const authenticatedUserItemsIds = authenticatedUserItems.map(item => item._id.toString());

    const authenticatedUserMatches = await Promise.all(likedItemsOwners.map(async itemOwner => {
      const itemOwnerLikes = await getUserLikes(itemOwner);
      
      let userMatch = false;
      itemOwnerLikes.forEach(like => {
        if (authenticatedUserItemsIds.includes(like)) {
          userMatch = true;
        }
      })
      return {
        id: itemOwner,
        matched: userMatch,
      }
    }));
    const filteredUserMatches = authenticatedUserMatches.filter(match => match.matched);
    const matchesWithDetails = await Promise.all(filteredUserMatches.map(async userMatch => {
      const response = await getContactDetails(userMatch.id);
      const contactDetails = await response.json();
      const matchObj = {
        userDisplayName: contactDetails.profile.nickName,
        userEmail: contactDetails.profile.email,
        userTelephone: contactDetails.profile.mobilePhone ? contactDetails.profile.mobilePhone : '',
      };
      return matchObj;
    }));
    res.json(matchesWithDetails);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
});

/*
  Lets say Melinda is authenticated User.
  Melinda likes 3 items => [itemID1, itemID2, itemID3].

  Melinda has published the following items => [MelindaItemID1, MelindaItemID2]

  Who owns the items that Melinda likes? 
  new array => [ownerID1, ownerID2, ownerID3]

  We need to see whether inside any of Melindas items any of the owners liked them.

  {
    matchedDisplayName: 'Dave 192',
  }

  1. get id of auth user (jwt)
  2. get the array of items the request user has liked (getUserLikes)
  3. 
*/

module.exports = router;