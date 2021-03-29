const router = require('express').Router();
const { getAllItems, getItemById } = require('../../database/services/items-service');

router.get('/', async (req, res, next) => {
  try {
    const items = await getAllItems();
    res.json(items);
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

module.exports = router;
