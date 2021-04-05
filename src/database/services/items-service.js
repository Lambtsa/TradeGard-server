const Item = require('../schemas/item');

const getAllItems = () => Item.find();

const getItemById = id => Item.findById(id);

const getItemsByUserId = userId => Item.find({ itemOwner: userId });

const getItemsByCategory = itemCategory => Item.find({ itemCategory: itemCategory.toLowerCase() });

const createItem = itemObj => new Item({
  itemTitle: itemObj.itemTitle,
  itemDescription: itemObj.itemDescription,
  itemImages: itemObj.itemImages,
  itemCategory: itemObj.itemCategory,
  itemOwner: itemObj.itemOwner,
}).save();

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  getItemsByCategory,
  getItemsByUserId,
};
