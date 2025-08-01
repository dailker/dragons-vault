import mongoose from 'mongoose';

// Use existing User model from register.js
const User = mongoose.models.User;

export default async function handler(req, res) {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_ATLAS_URI);
    }

    if (req.method === 'GET') {
      const { username } = req.query;
      
      if (!User) {
        return res.status(500).json({ message: 'User model not found' });
      }
      
      const user = await User.findOne({ username });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        username: user.username,
        fullName: user.fullName || user.username,
        bio: user.bio || "I am lazy to look my profile!",
        avatar: user.avatar || "🦕"
      });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Profile API error:', error);
    res.status(500).json({ message: error.message });
  }
}
------|
| **Device Theft** | High | P

  }

  if (req.method ===

ndow.location.origin : 

d' });
    }
  } catch (error) {
    console.error('Profil

v className="system-message

ies of 

sage });
    }
  } 



const messageSchema = ne
