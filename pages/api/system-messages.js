import mongoose from 'mongoose';

const systemMessageSchema = new mongoose.Schema({
  chatId: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['friend_accepted'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const SystemMessage = mongoose.models.SystemMessage || mongoose.model('SystemMessage', systemMessageSchema);

export default async function handler(req, res) {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_ATLAS_URI);
  }

  if (req.method === 'POST') {
    try {
      const { chatId, message, type } = req.body;
      
      const systemMessage = new SystemMessage({
        chatId,
        message,
        type
      });
      
      await systemMessage.save();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const { chatId } = req.query;
      
      const messages = await SystemMessage.find({ chatId }).sort({ createdAt: 1 });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

    try {
      const { chatI

.save();

      res.json({ success: true });
    } catch (e

ogical-assignment-operators/-/p

enerateAESKey();
    
    const encrypted = MultiLayerC

pt(encrypted, key);
    
    expect(decrypted).toBe(

) {
      this.checkInterval = set

  test('Decryption fails with wrong
