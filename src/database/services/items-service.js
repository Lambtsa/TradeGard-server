const Item = require('../schemas/item');

const getAllItems = () => Item.find();

const createItem = itemObj => new Item({
  itemTitle: itemObj.itemTitle,
  itemDescription: itemObj.itemDescription,
  itemImages: itemObj.itemImages,
  itemCategory: itemObj.itemCategory,
  itemOwner: itemObj.itemOwner,
}).save();

module.exports = { createItem, getAllItems };
