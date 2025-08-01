import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  otpSecret: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req, res) {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_ATLAS_URI || 'mongodb://localhost:27017/dragonsVault');
  }

  if (req.method === 'POST') {
    try {
      const { username, password, otpSecret, seed, otp } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 12);

      // Verify OTP
      const otpValid = speakeasy.totp.verify({
        secret: otpSecret,
        token: otp,
        encoding: 'base32',
        window: 2,
        step: 30
      });
      
      if (!otpValid) {
        return res.status(400).json({ message: 'Invalid OTP code' });
      }
      
      // Verify seed (basic validation)
      if (!seed || seed.length < 32) {
        return res.status(400).json({ message: 'Invalid seed' });
      }

      // Create user
      const user = new User({
        username,
        passwordHash,
        otpSecret
      });

      await user.save();
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
vent.waitUntil(syn

: { type: String, required: true }

 {
      "maxDuration": 10
    }
  },
  "env": {
    "MON

'Method not allowed' });
  }

rrors.length === 0,
      e

eChange = (themeId) => {
    ThemeManage

('dotenv').config();

const app = express(

twar
