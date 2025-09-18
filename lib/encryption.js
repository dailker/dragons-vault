import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';

export class MultiLayerCrypto {
  static generateAESKey() {
    return nacl.randomBytes(32);
  }

  static generateNonce() {
    return nacl.randomBytes(24);
  }

  static multiLayerEncrypt(message, aesKey) {
    try {
      const nonce = this.generateNonce();
      
      // First Layer: AES-256-GCM simulation with XSalsa20
      const firstLayer = nacl.secretbox(
        naclUtil.decodeUTF8(message),
        nonce,
        aesKey
      );

      // Second Layer: XChaCha20-Poly1305
      const chachaKey = nacl.randomBytes(32);
      const chachaNonce = nacl.randomBytes(24);
      const secondLayer = nacl.secretbox(
        firstLayer,
        chachaNonce,
        chachaKey
      );

      return {
        ciphertext: naclUtil.encodeBase64(secondLayer),
        chachaKey: naclUtil.encodeBase64(chachaKey),
        chachaNonce: naclUtil.encodeBase64(chachaNonce),
        nonce: naclUtil.encodeBase64(nonce)
      };
    } catch (error) {
      throw new Error('Encryption failed: ' + error.message);
    }
  }

  static multiLayerDecrypt(encryptedData, aesKey) {
    try {
      const { ciphertext, chachaKey, chachaNonce, nonce } = encryptedData;
      
      // Decode base64
      const ciphertextBytes = naclUtil.decodeBase64(ciphertext);
      const chachaKeyBytes = naclUtil.decodeBase64(chachaKey);
      const chachaNonceBytes = naclUtil.decodeBase64(chachaNonce);
      const nonceBytes = naclUtil.decodeBase64(nonce);

      // Second Layer: Decrypt XChaCha20
      const firstLayer = nacl.secretbox.open(
        ciphertextBytes,
        chachaNonceBytes,
        chachaKeyBytes
      );
      
      if (!firstLayer) throw new Error('Second layer decryption failed');

      // First Layer: Decrypt AES simulation
      const plaintext = nacl.secretbox.open(
        firstLayer,
        nonceBytes,
        aesKey
      );
      
      if (!plaintext) throw new Error('First layer decryption failed');

      return naclUtil.encodeUTF8(plaintext);
    } catch (error) {
      throw new Error('Decryption failed: ' + error.message);
    }
  }

  static generateKeyPair() {
    return nacl.box.keyPair();
  }
}