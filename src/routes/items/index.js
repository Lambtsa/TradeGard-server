const router = require('express').Router();
const { authenticationRequired, authenticateUser } = require('../../authentication/authentication-service');
const { getContactDetails, getUserLikes } = require('../../database/services/users-service');
const { addLike, removeLike } = require('../../database/services/likes-service');
const {
  getAllItems,
  getItemById,
  createItem,
  getItemsByUserId,
} = require('../../database/services/items-service');

router.get('/', authenticateUser, async (req, res, next) => {
  try {
    const responseObject = {
      userLikedItems: [],
    };
    if (req.query.userId) {
      const ownerItems = await getItemsByUserId(req.query.userId);
      responseObject.items = ownerItems;
      const itemsOwnerContactDetails = await getContactDetails(req.query.userId)
        .then(response => response.json());
      responseObject.ownerDisplayName = itemsOwnerContactDetails.profile.nickName;
    } else {
      responseObject.items = await getAllItems();
    }
    if (req.jwt) {
      const retrievedLikes = await getUserLikes(req.jwt.claims.uid);
      responseObject.userLikedItems = retrievedLikes;
    }
    res.json(responseObject);
  } catch (error) {
    next(error);
  }
});

router.get('/:itemId', authenticateUser, async (req, res, next) => {
  try {
    const responseObject = {
      userLikedItems: [],
    };
    const { itemId } = req.params;
    const item = await getItemById(itemId);
    if (item === null) {
      throw new Error(`The item with the id:${itemId} does not exist`);
    }
    responseObject.item = item;
    if (req.jwt) {
      const retrievedLikes = await getUserLikes(req.jwt.claims.uid);
      responseObject.userLikedItems = retrievedLikes;
    }
    const oktaResponse = await getContactDetails(item.itemOwner);
    if (!oktaResponse.ok) {
      throw new Error('There has been an error with Okta');
    }
    const contactDetails = await oktaResponse.json();
    responseObject.itemOwner = {
      userId: contactDetails.id,
      userDisplayName: contactDetails.profile.nickName,
      userEmail: contactDetails.profile.email,
      userTelephone: contactDetails.profile.mobilePhone ? contactDetails.profile.mobilePhone : '',
    };
    res.json(responseObject);
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
});

router.put('/:id', authenticationRequired, async (req, res, next) => {
  const { id } = req.params;
  const { isLiked } = req.body;
  const userId = req.jwt.claims.uid;
  try {
    if (isLiked) {
      await addLike(id, userId);
      res.status(204).end();
    } else {
      await removeLike(id, userId);
      res.status(204).end();
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticationRequired, async (req, res, next) => {
  try {
    const { item } = req.body;
    item.itemOwner = req.jwt.claims.uid;
    if (!item) {
      const error = new Error('Missing "item" property!');
      error.statusCode = 400;
      throw error;
    }
    const newItem = await createItem(item);
    res
      .status(201)
      .json(newItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
