const Item = require('../schemas/item');

const getAllItems = () => Item.find();

const getItemById = id => Item.findById(id);

const getItemsByUserId = userId => Item.find({ itemOwner: userId });

const createItem = itemObj => new Item({
  itemTitle: itemObj.itemTitle,
  itemDescription: itemObj.itemDescription,
  itemImages: itemObj.itemImages,
  itemCategory: itemObj.itemCategory,
  itemLocation: itemObj.itemLocation,
  itemOwner: itemObj.itemOwner,
}).save();

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  getItemsByUserId,
};
