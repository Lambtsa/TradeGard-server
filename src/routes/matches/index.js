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
      const theirLikes = [];
      itemOwnerLikes.forEach(like => {
        if (authenticatedUserItemsIds.includes(like)) {
          const likedObject = authenticatedUserItems.find(item => item._id.toString() === like);
          theirLikes.push({
            id: likedObject._id.toString(),
            itemTitle: likedObject.itemTitle,
          })
          likeCount += 1;
        }
      });

      const theirItemIds = await getItemsByUserId(itemOwner);
      
      const yourLikes = [];
      theirItemIds.forEach(theirThing => {
        if (authenticatedUserlikes.includes(theirThing._id.toString())) {
          yourLikes.push({
            id: theirThing._id.toString(),
            itemTitle: theirThing.itemTitle,
          })
        }
      })

      return {
        id: itemOwner,
        likes: likeCount,
        theirLikes,
        yourLikes,
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
        theirLikes: userMatch.theirLikes,
        yourLikes: userMatch.yourLikes,
      };
      return matchObj;
    }));
    console.log(matchesWithDetails[0].theirLikes);
    console.log(matchesWithDetails[0].yourLikes);
    res.json(matchesWithDetails);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
});

module.exports = router;
