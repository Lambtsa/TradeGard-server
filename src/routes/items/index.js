const router = require('express').Router();
const { authenticationRequired } = require('../../authentication/authentication-service');
const { getContactDetails } = require('../../database/services/users-service');
const {
  getAllItems,
  getItemById,
  getItemsByCategory,
  createItem,
} = require('../../database/services/items-service');

router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    if (category) {
      const items = await getItemsByCategory(category);
      res.json(items);
    } else {
      const items = await getAllItems();
      res.json(items);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await getItemById(id);
    if (item === null) {
      throw new Error(`The item with the id:${id} does not exist`);
    }
    const response = await getContactDetails(item.itemOwner);
    const contactDetails = await response.json();
    const responseObj= {
      itemCategory: item.itemCategory,
      itemCreationDateUTC: item.itemCreationDateUTC,
      itemDescription: item.itemDescription,
      itemTitle: item.itemTitle,
      itemOwner: {
        userDisplayName: contactDetails.profile.nickName,
        userEmail: contactDetails.profile.email,
        userTelephone: contactDetails.profile.mobilePhone ? contactDetails.profile.mobilePhone : '',
      },
      itemLikes: item.itemLikes,
      itemImages: item.itemImages,
    };
    res.json(responseObj);
  } catch (err) {
    err.statusCode = 404;
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
