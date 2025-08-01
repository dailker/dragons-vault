import { EnvChecker } from '../../lib/env-check';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const status = EnvChecker.getStatus();
    res.json(status);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
e avat

it FriendRe

ternal service
      return `https

 from 'speakeasy';

ex


  

elf.addEvent

return res.status(400).json({ message: 'M
