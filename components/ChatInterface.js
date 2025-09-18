import React, { useState, useEffect, useRef } from 'react';
import { MultiLayerCrypto } from '../lib/encryption';
import { SecureStorage } from '../lib/storage';
import { ThemeManager } from '../lib/theme';

export default function ChatInterface({ chatId, userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [aesKey, setAesKey] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    initializeChat();
    
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineMessages();
    };
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeChat = async () => {
    let key = await SecureStorage.getKey(`chat_${chatId}`);
    if (!key) {
      key = MultiLayerCrypto.generateAESKey();
      await SecureStorage.storeKey(`chat_${chatId}`, Array.from(key));
    } else {
      key = new Uint8Array(key);
    }
    setAesKey(key);
    
    if (isOnline) {
      await loadMessages();
    } else {
      const cached = await SecureStorage.getCachedMessages(chatId);
      setMessages(cached);
    }
  };

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/messages/${chatId}`);
      const data = await response.json();
      
      const decryptedMessages = await Promise.all(
        data.messages.map(async (msg) => {
          try {
            const plaintext = MultiLayerCrypto.multiLayerDecrypt({
              ciphertext: msg.ciphertext,
              chachaKey: msg.chachaKey || msg.nonce, // fallback
              chachaNonce: msg.chachaNonce || msg.nonce,
              nonce: msg.nonce
            }, aesKey);
            
            return {
              id: msg._id,
              sender: msg.sender,
              text: plaintext,
              timestamp: msg.timestamp
            };
          } catch (error) {
            return {
              id: msg._id,
              sender: msg.sender,
              text: '[Decryption failed]',
              timestamp: msg.timestamp
            };
          }
        })
      );
      
      setMessages(decryptedMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !aesKey) return;

    const messageObj = {
      sender: userId,
      text: newMessage,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };

    try {
      const encrypted = MultiLayerCrypto.multiLayerEncrypt(newMessage, aesKey);
      
      if (isOnline) {
        const response = await fetch('/api/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatId,
            sender: userId,
            ciphertext: encrypted.ciphertext,
            nonce: encrypted.nonce,
            chachaNonce: encrypted.chachaNonce
          })
        });
        
        if (response.ok) {
          setMessages(prev => [...prev, messageObj]);
        }
      } else {
        // Offline mode
        await SecureStorage.cacheMessage(chatId, messageObj);
        setMessages(prev => [...prev, { ...messageObj, offline: true }]);
      }
      
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const syncOfflineMessages = async () => {
    // Implementation for syncing offline messages when back online
    console.log('Syncing offline messages...');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>🔐 Dragon's Vault Chat</h2>
        <div className="theme-selector">
          <button 
            className="theme-btn dark" 
            data-theme="dark"
            onClick={() => ThemeManager.setTheme('dark')}
            title="Dark Theme"
          />
          <button 
            className="theme-btn light" 
            data-theme="light"
            onClick={() => ThemeManager.setTheme('light')}
            title="Light Theme"
          />
          <button 
            className="theme-btn blue" 
            data-theme="blue"
            onClick={() => ThemeManager.setTheme('blue')}
            title="Blue Theme"
          />
          <button 
            className="theme-btn neon" 
            data-theme="neon"
            onClick={() => ThemeManager.setTheme('neon')}
            title="Neon Theme"
          />
        </div>
        <div className="status">
          {isOnline ? '🟢 Online' : '🔴 Offline'}
        </div>
      </div>
      
      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender === userId ? 'own' : 'other'}`}>
            <div className="message-content">
              <strong>{msg.sender}:</strong> {msg.text}
              {msg.offline && <span className="offline-badge">📤</span>}
            </div>
            <div className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your encrypted message..."
        />
        <button onClick={sendMessage}>🚀 Send</button>
      </div>


    </div>
  );
}