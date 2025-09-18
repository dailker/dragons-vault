import React, { useState, useEffect } from 'react';
import { AuthManager } from '../lib/auth';
import { OfflineQR } from '../lib/qr-offline';

export default function AuthForm({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [passwordChecks, setPasswordChecks] = useState({});
  const [otpSecret, setOtpSecret] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [serverSeed, setServerSeed] = useState('');
  const [qrLoading, setQrLoading] = useState(false);
  const [qrTimeoutId, setQrTimeoutId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (qrTimeoutId) {
      clearTimeout(qrTimeoutId);
    }
    
    if (isRegister && formData.username.trim()) {
      setQrCodeUrl('');
      setQrLoading(true);
      const timeoutId = setTimeout(() => generateOTPSecret(), 500);
      setQrTimeoutId(timeoutId);
    } else if (isRegister && !formData.username.trim()) {
      setQrCodeUrl('');
      setQrLoading(false);
    }
  }, [isRegister, formData.username]);

  useEffect(() => {
    if (isRegister) {
      const validation = AuthManager.validatePassword(formData.password);
      setPasswordChecks(validation.checks);
    }
  }, [formData.password, isRegister]);

  const generateOTPSecret = async () => {
    if (!formData.username.trim()) return;
    
    try {
      const response = await fetch('/api/seed');
      const { seed } = await response.json();
      setServerSeed(seed);
      
      const secret = AuthManager.generateOTPSecret(formData.username);
      setOtpSecret(secret);
      
      // Random delay 0-3 seconds
      const delay = Math.random() * 3000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Generate QR with actual OTP URL for authenticator apps
      if (typeof window !== 'undefined') {
        const qrDataURL = await OfflineQR.createQRCode(secret.otpauth_url);
        setQrCodeUrl(qrDataURL);
      }
    } catch (error) {
      console.error('QR generation failed:', error);
    } finally {
      setQrLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (isRegister) {
      // Registration validation
      const passwordValidation = AuthManager.validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        setErrors({ password: 'Password does not meet requirements' });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: 'Passwords do not match' });
        return;
      }

      if (!AuthManager.verifyOTP(formData.otp, otpSecret.base32)) {
        setErrors({ otp: 'Invalid OTP code' });
        return;
      }

      // Register user
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            otpSecret: otpSecret.base32,
            seed: serverSeed || 'fallback',
            otp: formData.otp
          })
        });

        if (response.ok) {
          // Auto-login after registration
          onLogin(formData.username);
        } else {
          const error = await response.json();
          setErrors({ general: error.message });
        }
      } catch (error) {
        setErrors({ general: 'Registration failed' });
      }
    } else {
      // Login
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            otp: formData.otp
          })
        });

        if (response.ok) {
          onLogin(formData.username);
        } else {
          const error = await response.json();
          setErrors({ general: error.message });
        }
      } catch (error) {
        setErrors({ general: 'Login failed' });
      }
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>🐉 Dragon's Vault</h1>
        <p>Ultra-Secure Multi-Layered Encrypted Chat</p>
        
        <div className="auth-tabs">
          <button 
            className={!isRegister ? 'active' : ''}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button 
            className={isRegister ? 'active' : ''}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
            />
            {isRegister && formData.password && (
              <div className="password-checks">
                <div className={`check ${passwordChecks.length ? 'valid' : 'invalid'}`}>
                  {passwordChecks.length ? '✅' : '❌'} At least 8 characters
                </div>
                <div className={`check ${passwordChecks.number ? 'valid' : 'invalid'}`}>
                  {passwordChecks.number ? '✅' : '❌'} At least 1 number
                </div>
                <div className={`check ${passwordChecks.symbol ? 'valid' : 'invalid'}`}>
                  {passwordChecks.symbol ? '✅' : '❌'} At least 1 symbol
                </div>
                <div className={`check ${passwordChecks.uppercase ? 'valid' : 'invalid'}`}>
                  {passwordChecks.uppercase ? '✅' : '❌'} At least 1 uppercase
                </div>
              </div>
            )}
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          {isRegister && (
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                required
              />
              {formData.confirmPassword && (
                <div className={`check ${formData.password === formData.confirmPassword ? 'valid' : 'invalid'}`}>
                  {formData.password === formData.confirmPassword ? '✅' : '❌'} Passwords match
                </div>
              )}
              {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            </div>
          )}

          <div className="form-group">
            <input
              type="text"
              placeholder="OTP Code (6 digits)"
              value={formData.otp}
              onChange={(e) => handleChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength="6"
              required
            />
            {errors.otp && <div className="error">{errors.otp}</div>}
          </div>

          {errors.general && <div className="error">{errors.general}</div>}

          <button type="submit" className="submit-btn">
            {isRegister ? '🔐 Register' : '🚪 Login'}
          </button>
        </form>
      </div>

      {isRegister && (
        <div className="qr-section">
          <h3>📱 Scan QR Code</h3>
          <p>Use Google Authenticator or similar app</p>
          {qrLoading ? (
            <div className="qr-loading">
              <div className="loading-spinner"></div>
              <p>Generating QR Code...</p>
            </div>
          ) : qrCodeUrl ? (
            <div className="qr-code">
              <img src={qrCodeUrl} alt="QR Code for OTP" />
            </div>
          ) : (
            <div className="qr-loading">
              <p>Enter username to generate QR code</p>
            </div>
          )}
          <div className="qr-instructions">
            <strong>Setup Instructions:</strong><br/>
            1. Open your authenticator app<br/>
            2. Scan this QR code<br/>
            3. Enter the 6-digit code above
          </div>
        </div>
      )}
    </div>
  );
}