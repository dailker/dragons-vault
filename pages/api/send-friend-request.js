import mongoose from 'mongoose';

const friendRequestSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const FriendRequest = mongoose.models.FriendRequest || mongoose.model('FriendRequest', friendRequestSchema);

export default async function handler(req, res) {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_ATLAS_URI);
  }

  if (req.method === 'POST') {
    try {
      const { from, to } = req.body;

      // Prevent self friend request
      if (from === to) {
        return res.status(400).json({ message: 'Cannot send friend request to yourself' });
      }

      // Check if request already exists
      const existing = await FriendRequest.findOne({ 
        from, 
        to, 
        status: 'pending' 
      });

      if (existing) {
        return res.status(400).json({ message: 'Friend request already sent' });
      }

      const request = new FriendRequest({ from, to });
      await request.save();

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
on(messages);

 res.status(500).json({ message: 'User mod

mongoose';

// Use existing User model f

.json({ sta

: true }],
  messages: [messageSchema],
  sessionKeys:

_URI=mongodb+srv://username:passwor

 0;
  padding: 1.25rem 1.5rem;
  border-radius: va
