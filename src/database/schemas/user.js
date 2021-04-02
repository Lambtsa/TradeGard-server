const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userDisplayName: { type: String, required: [true, 'A display name is required'], unique: true },
  userId: { type: String, required: [true, 'A user id is required'], unique: true },
  userLikedItems: { type: [String], default: [] },
});

module.exports = mongoose.model('users', userSchema);
