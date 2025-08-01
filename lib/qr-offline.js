import { AuthManager } from './auth';

export class OfflineQR {

  static createQRCode(data) {
    if (typeof window === 'undefined') return '';
    
    // Use existing qrcode library via API
    return fetch('/api/qr-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otpauth_url: data })
    })
    .then(res => res.json())
    .then(result => result.qrCode)
    .catch(() => {
      // Fallback to external service
      return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
    });
  }


}
orm from '../components/AuthForm';
import { SecureS

{
  if (!mongoose

 environment variables
    if (!process.env.MONGO_ATLA

{
    "next": "^14.0.0",
    "react": "^18.0.0",
    "

crypto.test

   {current

e();
     
