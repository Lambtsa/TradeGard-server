const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemTitle: { type: String, required: [true, 'The item title is required'] },
  itemDescription: { type: String, required: [true, 'The item description is required'] },
  itemImages: { type: [String], validate: v => Array.isArray(v) && v.length > 0 },
  itemCategory: {
    type: String,
    enum: ['Books', 'Clothes', 'Furniture'],
    required: [true, 'The item category is required'],
  },
  itemOwner: { type: String, required: [true, 'Owner ID is required'] },
  itemLikes: { type: [String] }
});

module.exports = mongoose.model('items', itemSchema);