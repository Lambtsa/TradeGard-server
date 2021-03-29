const Item = require('../schemas/item');

const createItem = ( itemObj ) => new Item({
  itemTitle: itemObj.itemTitle,
  itemDescription: itemObj.itemDescription,
  itemImages: itemObj.itemImages,
  itemCategory: itemObj.itemCategory,
  itemOwner: itemObj.itemOwner,
}).save();

module.exports = { createItem };