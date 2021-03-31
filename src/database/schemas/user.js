const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userDisplayName: { type: String, required: [true, 'A display name is required'], unique: true },
});

module.exports = mongoose.model('users', userSchema);
