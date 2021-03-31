const router = require('express').Router();

const itemsRouter = require('./items');
const usersRouter = require('./users');

router.use('/items', itemsRouter);
router.use('/users', usersRouter);

module.exports = router;
