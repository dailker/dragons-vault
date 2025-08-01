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
      const { username, password, otp } = req.body;

      // Find user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if user has password hash
      if (!user.passwordHash) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const passwordValid = await bcrypt.compare(password, user.passwordHash);
      if (!passwordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if user has OTP secret
      if (!user.otpSecret) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify OTP
      const otpValid = speakeasy.totp.verify({
        secret: user.otpSecret,
        token: otp,
        encoding: 'base32',
        window: 2,
        step: 30
      });

      if (!otpValid) {
        return res.status(401).json({ message: 'Invalid OTP code' });
      }

      res.json({ message: 'Login successful', username });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
    const seed = crypto.randomByt

= async () =>

ar-section {
  text-align: center;
  margin-bottom: 

t default function ChatInterface(

ct } from 'react';
import MainLa

           >
                  <div 
        

e64(nonce)
      };
    } catc
