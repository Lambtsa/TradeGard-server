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
    let items;
    let contactDetails;
    if (req.query.userId) {
      items = await getItemsByUserId(req.query.userId);
      contactDetails = await getContactDetails(req.query.userId).then(response => response.json());
    } else {
      items = await getAllItems();
    }
    let userLikedItems = [];
    if (req.jwt) {
      const retrievedLikes = await getUserLikes(req.jwt.claims.uid);
      userLikedItems = retrievedLikes;
    }
    res.json({
      items,
      userLikedItems,
      ownerDisplayName: contactDetails ? contactDetails.profile.nickName : '',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await getItemById(id);
    if (item === null) {
      throw new Error(`The item with the id:${id} does not exist`);
    }
    let userLikedItems = [];
    if (req.jwt) {
      const retrievedLikes = await getUserLikes(req.jwt.claims.uid);
      userLikedItems = retrievedLikes;
    }
    const itemOwnerResponse = await getContactDetails(item.itemOwner);
    const contactDetails = await itemOwnerResponse.json();
    const responseObj = {
      itemCategory: item.itemCategory,
      itemCreationDateUTC: item.itemCreationDateUTC,
      itemDescription: item.itemDescription,
      itemTitle: item.itemTitle,
      itemOwner: {
        userId: contactDetails.id,
        userDisplayName: contactDetails.profile.nickName,
        userEmail: contactDetails.profile.email,
        userTelephone: contactDetails.profile.mobilePhone ? contactDetails.profile.mobilePhone : '',
      },
      itemLikes: item.itemLikes,
      itemImages: item.itemImages,
      userLikedItems,
    };
    res.json(responseObj);
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
    console.log(err.message);
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
