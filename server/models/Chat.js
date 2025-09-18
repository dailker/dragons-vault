const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  ciphertext: { type: String, required: true },
  nonce: { type: String, required: true },
  chachaNonce: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true },
  participants: [{ type: String, required: true }],
  messages: [messageSchema],
  sessionKeys: { type: Map, of: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);