const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Chat = require('./models/Chat');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGO_ATLAS_URI || 'mongodb://localhost:27017/dragonsVault');

app.post('/api/message', async (req, res) => {
  try {
    const { chatId, sender, ciphertext, nonce, chachaNonce } = req.body;
    
    let chat = await Chat.findOne({ chatId });
    if (!chat) {
      chat = new Chat({ chatId, participants: [sender], messages: [] });
    }
    
    chat.messages.push({ sender, ciphertext, nonce, chachaNonce });
    await chat.save();
    
    res.json({ status: 'ok', messageId: chat.messages[chat.messages.length - 1]._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/messages/:chatId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ chatId: req.params.chatId });
    res.json({ messages: chat?.messages || [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { chatId, participants } = req.body;
    const chat = new Chat({ chatId, participants, messages: [] });
    await chat.save();
    res.json({ status: 'created', chatId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Secure Chat API running on port ${PORT}`));