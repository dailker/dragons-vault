import mongoose from 'mongoose';

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

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

export default async function handler(req, res) {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_ATLAS_URI || 'mongodb://localhost:27017/dragonsVault');
  }

  if (req.method === 'POST') {
    try {
      const { chatId, participants } = req.body;
      
      let chat = await Chat.findOne({ chatId });
      if (!chat) {
        chat = new Chat({ chatId, participants, messages: [] });
        await chat.save();
        res.json({ status: 'created', chatId });
      } else {
        res.json({ status: 'exists', chatId });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}