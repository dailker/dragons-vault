import QRCode from 'qrcode';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { otpauth_url } = req.body;
      
      if (!otpauth_url) {
        return res.status(400).json({ message: 'Missing otpauth_url' });
      }
      
      const qrCodeDataURL = await QRCode.toDataURL(otpauth_url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });

      res.json({ qrCode: qrCodeDataURL });
    } catch (error) {
      console.error('QR Code generation error:', error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}