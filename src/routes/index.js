const router = require('express').Router();

const itemsRouter = require('./items');
const usersRouter = require('./users');
const matchesRouter = require('./matches');

router.use('/items', itemsRouter);
router.use('/users', usersRouter);
router.use('/matches', matchesRouter);

module.exports = router;
