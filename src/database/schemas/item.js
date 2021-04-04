const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemTitle: { type: String, required: [true, 'The item title is required'] },
  itemDescription: { type: String, required: [true, 'The item description is required'] },
  itemCreationDateUTC: { type: Date, default: Date.now },
  itemImages: { type: [String], validate: v => Array.isArray(v) && v.length > 0 },
  itemCategory: {
    type: String,
    enum: ['books', 'clothes', 'electronics', 'furniture', 'hobbies'],
    required: [true, 'The item category is required'],
  },
  itemOwner: { type: String, required: [true, 'Owner ID is required'] },
  itemLikes: { type: [String], default: [] },
});

module.exports = mongoose.model('items', itemSchema);
