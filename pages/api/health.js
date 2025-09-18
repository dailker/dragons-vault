import { EnvChecker } from '../../lib/env-check';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const status = EnvChecker.getStatus();
    res.json(status);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}