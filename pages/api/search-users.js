import mongoose from 'mongoose';

const User = mongoose.models.User;

export default async function handler(req, res) {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_ATLAS_URI);
    }

    if (req.method === 'GET') {
      const { q } = req.query;
      
      if (!q || q.trim().length < 2) {
        return res.json([]);
      }

      if (!User) {
        return res.status(500).json({ message: 'User model not found' });
      }

      const users = await User.find({
        username: { $regex: q, $options: 'i' }
      }).limit(10).select('username fullName avatar');

      res.json(users.map(user => ({
        username: user.username,
        fullName: user.fullName || user.username,
        avatar: user.avatar || '🦕'
      })));
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ message: error.message });
  }
}