import speakeasy from 'speakeasy';

export class AuthManager {
  static validatePassword(password) {
    const checks = {
      length: password.length >= 8,
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password)
    };
    
    const isValid = Object.values(checks).every(check => check);
    return { isValid, checks };
  }

  static generateOTPSecret(username) {
    return speakeasy.generateSecret({
      name: `Dragon's Vault (${username})`,
      issuer: "Dragon's Vault",
      length: 32
    });
  }

  static verifyOTP(token, secret) {
    // Skip client-side verification, let server handle it
    return token && token.length === 6 && /^\d{6}$/.test(token);
  }

  static generateQRCode(secret) {
    return secret.otpauth_url;
  }
}
</li>
              <l

ode(secret) {
    return secret.otp

ttps://registry.npmj

y2);
    expect

ssage: 'Invalid credential

, conversationSchema);

export default a

'undefined') {
      localStorage.setItem(key,
