import mongoose from 'mongoose';

const friendRequestSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, default: '' },
  bio: { type: String, default: "I am lazy to look my profile!" },
  avatar: { type: String, default: "🦕" }
});

const FriendRequest = mongoose.models.FriendRequest || mongoose.model('FriendRequest', friendRequestSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req, res) {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_ATLAS_URI);
  }

  if (req.method === 'GET') {
    try {
      const { username } = req.query;
      
      const requests = await FriendRequest.find({ 
        to: username, 
        status: 'pending' 
      }).sort({ createdAt: -1 });

      const requestsWithUserData = await Promise.all(
        requests.map(async (request) => {
          const user = await User.findOne({ username: request.from });
          return {
            id: request._id,
            username: request.from,
            avatar: user?.avatar || '🦕',
            fullName: user?.fullName || request.from,
            timestamp: new Date(request.createdAt).toLocaleString()
          };
        })
      );

      res.json(requestsWithUserData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { action, requestId, acceptedBy, requestFrom } = req.body;
      
      if (action === 'accept') {
        await FriendRequest.findByIdAndUpdate(requestId, { status: 'accepted' });
        
        // Create conversation
        const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', {
          participants: [String],
          lastMessage: String,
          lastMessageTime: { type: Date, default: Date.now },
          isSystemMessage: { type: Boolean, default: false }
        });
        
        const systemMsg = `${acceptedBy} and ${requestFrom} are now friends`;
        
        await Conversation.create({
          participants: [acceptedBy, requestFrom],
          lastMessage: systemMsg,
          isSystemMessage: true
        });
      } else if (action === 'decline') {
        await FriendRequest.findByIdAndUpdate(requestId, { status: 'declined' });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}