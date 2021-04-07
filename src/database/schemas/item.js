const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemTitle: { type: String, required: [true, 'The item title is required'] },
  itemDescription: { type: String, required: [true, 'The item description is required'] },
  itemCreationDateUTC: { type: Date, default: Date.now },
  itemImages: { type: [String], validate: v => Array.isArray(v) && v.length > 0 },
  itemCategory: {
    type: String,
    enum: [
      'bicyles',
      'books',
      'clothes',
      'electronics',
      'furniture',
      'garden',
      'hobbies',
      'jewellery',
      'music',
      'phones',
      'services',
      'tools',
      'vehicles',
    ],
    required: [true, 'The item category is required'],
  },
  itemLocation: {
    type: String,
    enum: [
      'stockholm',
      'göteborg',
      'malmö',
      'uppsala',
      'sollentuna',
      'västerås',
      'örebro',
      'linköping',
      'helsingborg',
      'jönköping',
      'norrköping',
      'lund',
    ],
    required: [true, 'The item location is required'],
  },
  itemOwner: { type: String, required: [true, 'Owner ID is required'] },
  itemLikes: { type: [String], default: [] },
});

module.exports = mongoose.model('items', itemSchema);
