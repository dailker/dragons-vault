const { MultiLayerCrypto } = require('../lib/encryption.node');

describe('Security Tests', () => {
  test('Encryption produces different outputs for same input', () => {
    const message = 'test message';
    const key = MultiLayerCrypto.generateAESKey();
    
    const encrypted1 = MultiLayerCrypto.multiLayerEncrypt(message, key);
    const encrypted2 = MultiLayerCrypto.multiLayerEncrypt(message, key);
    
    expect(encrypted1.ciphertext).not.toBe(encrypted2.ciphertext);
    expect(encrypted1.nonce).not.toBe(encrypted2.nonce);
  });

  test('Decryption fails with wrong key', () => {
    const message = 'secret message';
    const correctKey = MultiLayerCrypto.generateAESKey();
    const wrongKey = MultiLayerCrypto.generateAESKey();
    
    const encrypted = MultiLayerCrypto.multiLayerEncrypt(message, correctKey);
    
    expect(() => {
      MultiLayerCrypto.multiLayerDecrypt(encrypted, wrongKey);
    }).toThrow();
  });

  test('Keys are cryptographically random', () => {
    const key1 = MultiLayerCrypto.generateAESKey();
    const key2 = MultiLayerCrypto.generateAESKey();
    
    expect(key1).not.toEqual(key2);
    expect(key1.length).toBe(32);
    expect(key2.length).toBe(32);
  });

  test('Nonces are unique', () => {
    const nonces = new Set();
    for (let i = 0; i < 100; i++) {
      const nonce = MultiLayerCrypto.generateNonce();
      const nonceStr = Buffer.from(nonce).toString('hex');
      expect(nonces.has(nonceStr)).toBe(false);
      nonces.add(nonceStr);
    }
  });

  test('Encrypted data contains no plaintext', () => {
    const message = 'sensitive information';
    const key = MultiLayerCrypto.generateAESKey();
    const encrypted = MultiLayerCrypto.multiLayerEncrypt(message, key);
    
    expect(encrypted.ciphertext).not.toContain(message);
    expect(encrypted.nonce).not.toContain(message);
    expect(encrypted.chachaNonce).not.toContain(message);
  });
});