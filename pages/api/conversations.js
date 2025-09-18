import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants: [String],
  lastMessage: String,
  lastMessageTime: { type: Date, default: Date.now },
  isSystemMessage: { type: Boolean, default: false }
});

const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);

export default async function handler(req, res) {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_ATLAS_URI);
  }

  if (req.method === 'GET') {
    try {
      const { username } = req.query;
      
      const conversations = await Conversation.find({
        participants: username
      }).sort({ lastMessageTime: -1 });

      const conversationsWithUserData = await Promise.all(
        conversations.map(async (conv) => {
          const otherUser = conv.participants.find(p => p !== username);
          const User = mongoose.models.User;
          const user = await User.findOne({ username: otherUser });
          
          return {
            id: conv._id,
            username: otherUser,
            avatar: user?.avatar || '🦕',
            fullName: user?.fullName || otherUser,
            lastMessage: conv.lastMessage,
            isSystemMessage: conv.isSystemMessage
          };
        })
      );

      res.json(conversationsWithUserData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}