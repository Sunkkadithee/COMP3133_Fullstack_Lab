const mongoose = require('mongoose');

const groupMessageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  room: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const GroupMessage = mongoose.model('GroupMessage', groupMessageSchema);

module.exports = GroupMessage;
