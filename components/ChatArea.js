import React from 'react';

export default function ChatArea({ selectedChat, username }) {
  if (!selectedChat) {
    return (
      <div className="chat-area">
        <div className="no-chat-selected">
          <div className="no-chat-icon">🐉</div>
          <h2>Dragon's Vault</h2>
          <p>Select a conversation to start messaging</p>
          <span>Your messages are encrypted end-to-end</span>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="chat-avatar">{selectedChat.avatar || '🦕'}</div>
          <div className="chat-user-details">
            <h3>{selectedChat.username}</h3>
            <span className="status">Online</span>
          </div>
        </div>
      </div>
      
      <div className="messages-container">
        <div className="welcome-message">
          <p>🔒 Messages are end-to-end encrypted</p>
        </div>
      </div>
      
      <div className="message-input">
        <input 
          type="text" 
          placeholder="Type a message..." 
        />
        <button>Send</button>
      </div>
    </div>
  );
}