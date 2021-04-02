const Item = require('../schemas/item');
const User = require('../schemas/user');

const addLike = async (itemId, userId) => {
  try {
    const item = await Item.findById(itemId);
    const user = await User.findById(userId);
    if (item === null || user === null) {
      throw new Error("Item or User does not exist");
    }
    item.itemLikes = [...item.itemLikes, userId];
    await item.save();
    user.userLikedItems = [...user.userLikedItems, itemId];
    await user.save();
    return "item and user updated successfully"
  } catch (err) {
    throw err
  }
}

const removeLike = (itemId, userId) => {
  try {
    const item = await Item.findById(itemId);
    const user = await User.findById(userId);
    if (item === null || user === null) {
      throw new Error("Item or User does not exist");
    }
    item.itemLikes = item.itemLikes.filter(like => like !== userId);
    await item.save();
    user.userLikedItems = user.userLikedItems.filter(like => like !== itemId);
    await user.save();
    return "Item and user updated successfully"
  } catch (err) {
    throw err
  }
}

module.exports = {
  addLike,
  removeLike,
};
