import React, { useState, useEffect } from 'react';
import SystemMessage from './SystemMessage';

export default function ChatList({ onChatSelect, selectedChat, onStartNewChat, username }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, [username]);

  const fetchConversations = async () => {
    try {
      const response = await fetch(`/api/conversations?username=${username}`);
      const data = await response.json();
      setConversations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = Array.isArray(conversations) 
    ? conversations.filter(conv =>
        conv.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Chats</h2>
      </div>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="filter-btn" title="Filter">
          🔍
        </button>
      </div>
      
      <div className="conversations">
        {loading ? (
          <div className="no-conversations">
            <div className="loading-spinner"></div>
            <p>Loading conversations...</p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="no-conversations">
            <div className="no-conv-icon">💬</div>
            <p>No conversations yet</p>
            <span>
              <a 
                href="#" 
                className="start-new-chat-link"
                onClick={(e) => {
                  e.preventDefault();
                  onStartNewChat();
                }}
              >
                Start a new chat
              </a> to begin messaging
            </span>
          </div>
        ) : (
          filteredConversations.map(conv => (
            <div 
              key={conv.id}
              className={`conversation-card ${selectedChat?.id === conv.id ? 'selected' : ''}`}
              onClick={() => onChatSelect(conv)}
            >
              <div className="conv-avatar">{conv.avatar || '🦕'}</div>
              <div className="conv-info">
                <div className="conv-username">{conv.username}</div>
                <div className={`conv-last-message ${conv.isSystemMessage ? 'system' : ''}`}>
                  {conv.lastMessage?.length > 40 
                    ? conv.lastMessage.substring(0, 40) + '...' 
                    : conv.lastMessage || 'No messages yet'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}