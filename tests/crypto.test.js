const { MultiLayerCrypto } = require('../lib/encryption.node');
const nacl = require('tweetnacl');

describe('Cryptography Tests', () => {
  test('Multi-layer encryption/decryption roundtrip', () => {
    const message = 'Hello, secure world!';
    const key = MultiLayerCrypto.generateAESKey();
    
    const encrypted = MultiLayerCrypto.multiLayerEncrypt(message, key);
    const decrypted = MultiLayerCrypto.multiLayerDecrypt(encrypted, key);
    
    expect(decrypted).toBe(message);
  });

  test('Encryption handles empty messages', () => {
    const message = '';
    const key = MultiLayerCrypto.generateAESKey();
    
    const encrypted = MultiLayerCrypto.multiLayerEncrypt(message, key);
    const decrypted = MultiLayerCrypto.multiLayerDecrypt(encrypted, key);
    
    expect(decrypted).toBe(message);
  });

  test('Encryption handles unicode characters', () => {
    const message = '🔐 Secure 中文 العربية 🛡️';
    const key = MultiLayerCrypto.generateAESKey();
    
    const encrypted = MultiLayerCrypto.multiLayerEncrypt(message, key);
    const decrypted = MultiLayerCrypto.multiLayerDecrypt(encrypted, key);
    
    expect(decrypted).toBe(message);
  });

  test('Key generation produces valid keys', () => {
    const key = MultiLayerCrypto.generateAESKey();
    
    expect(key).toBeInstanceOf(Uint8Array);
    expect(key.length).toBe(32);
  });

  test('Nonce generation produces valid nonces', () => {
    const nonce = MultiLayerCrypto.generateNonce();
    
    expect(nonce).toBeInstanceOf(Uint8Array);
    expect(nonce.length).toBe(24);
  });

  test('Keypair generation works', () => {
    const keypair = MultiLayerCrypto.generateKeyPair();
    
    expect(keypair.publicKey).toBeInstanceOf(Uint8Array);
    expect(keypair.secretKey).toBeInstanceOf(Uint8Array);
    expect(keypair.publicKey.length).toBe(32);
    expect(keypair.secretKey.length).toBe(32);
  });

  test('Large message encryption', () => {
    const message = 'A'.repeat(10000);
    const key = MultiLayerCrypto.generateAESKey();
    
    const encrypted = MultiLayerCrypto.multiLayerEncrypt(message, key);
    const decrypted = MultiLayerCrypto.multiLayerDecrypt(encrypted, key);
    
    expect(decrypted).toBe(message);
  });
});