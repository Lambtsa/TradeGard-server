const router = require('express').Router();
const { authenticationRequired } = require('../../authentication/authentication-service');
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
    res.json(item);
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
});

router.post('/', authenticationRequired, async (req, res, next) => {
  try {
    const { item } = req.body;
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
