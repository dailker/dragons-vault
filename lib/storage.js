export class SecureStorage {
  static setItem(key, value) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static getItem(key) {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  static removeItem(key) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  static async initIndexedDB() {
    if (typeof window === 'undefined') return null;
    
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('DragonVaultDB', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('keys')) {
          db.createObjectStore('keys', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('messages')) {
          db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  static async storeKey(keyId, keyData) {
    const db = await this.initIndexedDB();
    const transaction = db.transaction(['keys'], 'readwrite');
    const store = transaction.objectStore('keys');
    await store.put({ id: keyId, data: keyData });
  }

  static async getKey(keyId) {
    const db = await this.initIndexedDB();
    const transaction = db.transaction(['keys'], 'readonly');
    const store = transaction.objectStore('keys');
    const result = await store.get(keyId);
    return result?.data;
  }

  static async cacheMessage(chatId, message) {
    const db = await this.initIndexedDB();
    const transaction = db.transaction(['messages'], 'readwrite');
    const store = transaction.objectStore('messages');
    await store.put({ chatId, message, timestamp: Date.now() });
  }

  static async getCachedMessages(chatId) {
    const db = await this.initIndexedDB();
    const transaction = db.transaction(['messages'], 'readonly');
    const store = transaction.objectStore('messages');
    const messages = [];
    
    return new Promise((resolve) => {
      const cursor = store.openCursor();
      cursor.onsuccess = (event) => {
        const result = event.target.result;
        if (result) {
          if (result.value.chatId === chatId) {
            messages.push(result.value.message);
          }
          result.continue();
        } else {
          resolve(messages);
        }
      };
    });
  }
}