const router = require('express').Router();
const { getAllItems } = require('../../database/services/items-service');

router.get('/', async (req, res, next) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
