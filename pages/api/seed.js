import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const seed = crypto.randomBytes(32).toString('base64');
    res.json({ seed });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}