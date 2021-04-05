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
    const filteredOwnersList = likedItemsOwners
      .filter((value, index) => likedItemsOwners.indexOf(value) === index)
      .filter(value => value !== uid);
    console.log(filteredOwnersList);

    const authenticatedUserItems = await getItemsByUserId(uid);
    const authenticatedUserItemsIds = authenticatedUserItems.map(item => item._id.toString());

    const authenticatedUserMatches = await Promise.all(filteredOwnersList.map(async itemOwner => {
      const itemOwnerLikes = await getUserLikes(itemOwner);

      let likeCount = 0;
      itemOwnerLikes.forEach(like => {
        if (authenticatedUserItemsIds.includes(like)) {
          likeCount += 1;
        }
      });
      return {
        id: itemOwner,
        likes: likeCount,
      }
    }));
    const filteredUserMatches = authenticatedUserMatches.filter(match => match.likes > 0);
    const matchesWithDetails = await Promise.all(filteredUserMatches.map(async userMatch => {
      const response = await getContactDetails(userMatch.id);
      const contactDetails = await response.json();
      const matchObj = {
        userLikeCount: userMatch.likes,
        userDisplayName: contactDetails.profile.nickName,
        userEmail: contactDetails.profile.email,
        userTelephone: contactDetails.profile.mobilePhone ? contactDetails.profile.mobilePhone : '',
      };
      return matchObj;
    }));
    console.log(matchesWithDetails);
    res.json(matchesWithDetails);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
});

module.exports = router;
